import { useState } from "react";
import dayjs from "dayjs";

export const useFlightSearchForm = (onSearch) => {
  const [tripType, setTripType] = useState("round-trip");
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs().add(7, "day"));
  const [adults, setAdults] = useState(1);
  const [travelClass, setTravelClass] = useState("ECONOMY");
  const [errors, setErrors] = useState({});

  const swapLocations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleFieldChange = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!origin) newErrors.origin = "Origin airport is required";
    if (!destination) newErrors.destination = "Destination airport is required";
    if (origin && destination && origin.code === destination.code) {
      newErrors.destination = "Destination must be different from origin";
    }
    if (!departureDate) newErrors.departureDate = "Departure date is required";
    if (tripType === "round-trip" && !returnDate) {
      newErrors.returnDate = "Return date is required";
    }
    if (tripType === "round-trip" && returnDate?.isBefore(departureDate)) {
      newErrors.returnDate = "Return date must be after departure";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSearch?.({
      origin: origin.code,
      destination: destination.code,
      departureDate: departureDate.format("YYYY-MM-DD"),
      adults,
      travelClass,
      ...(tripType === "round-trip" && {
        returnDate: returnDate.format("YYYY-MM-DD"),
      }),
    });
  };

  return {
    state: {
      tripType,
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      travelClass,
      errors,
    },
    actions: {
      setTripType,
      setOrigin,
      setDestination,
      setDepartureDate,
      setReturnDate,
      setAdults,
      setTravelClass,
      swapLocations,
      handleFieldChange,
      handleSubmit,
    },
  };
};
