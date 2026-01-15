import { useState, useCallback } from "react";
import amadeusService from "../services/amadeusApi";

export const useFlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [dictionaries, setDictionaries] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchFlights = useCallback(async (searchParams) => {
    setLoading(true);
    setError(null);

    try {
      const result = await amadeusService.searchFlights(searchParams);
      setFlights(result.flights);
      setDictionaries(result.dictionaries);
    } catch (err) {
      setError(err.message);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    flights,
    dictionaries,
    loading,
    error,
    searchFlights,
  };
};
