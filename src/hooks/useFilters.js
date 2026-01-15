import { useState, useMemo, useCallback } from "react";

export const useFilters = (flights) => {
  const [filters, setFilters] = useState({
    priceRange: null,
    stops: [],
    airlines: [],
  });

  const filterOptions = useMemo(() => {
    if (!flights || flights.length === 0) {
      return {
        priceRange: [0, 1000],
        airlines: [],
      };
    }

    const prices = flights.map((f) => f.price.total);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));

    const airlineMap = new Map();
    flights.forEach((flight) => {
      flight.validatingAirlineCodes.forEach((code) => {
        airlineMap.set(code, (airlineMap.get(code) || 0) + 1);
      });
    });

    const airlines = Array.from(airlineMap.entries())
      .map(([code, count]) => ({ code, count, name: code }))
      .sort((a, b) => b.count - a.count);

    return {
      priceRange: [minPrice, maxPrice],
      airlines,
    };
  }, [flights]);

  const filteredFlights = useMemo(() => {
    if (!flights || flights.length === 0) return [];

    return flights.filter((flight) => {
      const priceRange = filters.priceRange || filterOptions.priceRange;
      if (
        flight.price.total < priceRange[0] ||
        flight.price.total > priceRange[1]
      ) {
        return false;
      }

      if (filters.stops.length > 0) {
        const stops = flight.numberOfStops;
        const matchesStops = filters.stops.some((filterStop) => {
          if (filterStop === 2) {
            return stops >= 2;
          }
          return stops === filterStop;
        });
        if (!matchesStops) return false;
      }

      if (filters.airlines.length > 0) {
        const hasAirline = flight.validatingAirlineCodes.some((code) =>
          filters.airlines.includes(code)
        );
        if (!hasAirline) return false;
      }

      return true;
    });
  }, [flights, filters, filterOptions]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (
      filters.priceRange &&
      (filters.priceRange[0] !== filterOptions.priceRange[0] ||
        filters.priceRange[1] !== filterOptions.priceRange[1])
    ) {
      count++;
    }
    if (filters.stops.length > 0) count++;
    if (filters.airlines.length > 0) count++;
    return count;
  }, [filters, filterOptions]);

  const handleFilterChange = useCallback((filterType, value) => {
    if (filterType === "reset") {
      setFilters({
        priceRange: null,
        stops: [],
        airlines: [],
      });
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  }, []);

  return {
    filters,
    filteredFlights,
    filterOptions,
    activeFiltersCount,
    handleFilterChange,
  };
};
