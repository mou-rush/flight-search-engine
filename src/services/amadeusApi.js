import axios from "axios";

const AMADEUS_API_BASE = "https://test.api.amadeus.com/v2";
const TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";

class AmadeusService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(
        TOKEN_URL,
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.REACT_APP_AMADEUS_API_KEY,
          client_secret: process.env.REACT_APP_AMADEUS_API_SECRET,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;

      return this.accessToken;
    } catch (error) {
      console.error("Error getting access token:", error);
      throw new Error("Failed to authenticate with Amadeus API");
    }
  }

  async searchFlights(searchParams) {
    try {
      const token = await this.getAccessToken();

      const params = {
        originLocationCode: searchParams.origin,
        destinationLocationCode: searchParams.destination,
        departureDate: searchParams.departureDate,
        adults: searchParams.adults || 1,
        max: 50,
      };

      if (searchParams.returnDate) {
        params.returnDate = searchParams.returnDate;
      }

      if (searchParams.travelClass) {
        params.travelClass = searchParams.travelClass;
      }

      const response = await axios.get(
        `${AMADEUS_API_BASE}/shopping/flight-offers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        }
      );

      return this.processFlightData(response.data);
    } catch (error) {
      console.error("Error searching flights:", error);

      if (error.response) {
        throw new Error(
          error.response.data?.errors?.[0]?.detail ||
            "Failed to search flights. Please check your search criteria."
        );
      } else if (error.request) {
        throw new Error(
          "No response from flight search API. Please try again."
        );
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    }
  }

  processFlightData(data) {
    if (!data.data || data.data.length === 0) {
      return { flights: [], dictionaries: {} };
    }

    const flights = data.data.map((offer) => ({
      id: offer.id,
      price: {
        total: parseFloat(offer.price.total),
        currency: offer.price.currency,
      },
      itineraries: offer.itineraries.map((itinerary) => ({
        duration: itinerary.duration,
        segments: itinerary.segments.map((segment) => ({
          departure: {
            iataCode: segment.departure.iataCode,
            at: segment.departure.at,
          },
          arrival: {
            iataCode: segment.arrival.iataCode,
            at: segment.arrival.at,
          },
          carrierCode: segment.carrierCode,
          number: segment.number,
          aircraft: segment.aircraft?.code,
          duration: segment.duration,
        })),
      })),
      numberOfStops: offer.itineraries[0].segments.length - 1,
      validatingAirlineCodes: offer.validatingAirlineCodes,
    }));

    return {
      flights,
      dictionaries: data.dictionaries || {},
    };
  }
}

export default new AmadeusService();
