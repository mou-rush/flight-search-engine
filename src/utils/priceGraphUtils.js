export const getPriceRanges = (flights) => {
  const ranges = {
    budget1: { label: "$0-200", min: 0, max: 200, flights: [] },
    budget2: { label: "$200-400", min: 200, max: 400, flights: [] },
    economy1: { label: "$400-600", min: 400, max: 600, flights: [] },
    economy2: { label: "$600-800", min: 600, max: 800, flights: [] },
    premium: { label: "$800-1000", min: 800, max: 1000, flights: [] },
    business: { label: "$1000+", min: 1000, max: Infinity, flights: [] },
  };

  flights.forEach((f) => {
    const price = f.price.total;
    if (price < 200) ranges.budget1.flights.push(f);
    else if (price < 400) ranges.budget2.flights.push(f);
    else if (price < 600) ranges.economy1.flights.push(f);
    else if (price < 800) ranges.economy2.flights.push(f);
    else if (price < 1000) ranges.premium.flights.push(f);
    else ranges.business.flights.push(f);
  });

  return Object.values(ranges).map((range) => ({
    range: range.label,
    count: range.flights.length,
    avgPrice:
      range.flights.length > 0
        ? Math.round(
            range.flights.reduce((sum, f) => sum + f.price.total, 0) /
              range.flights.length
          )
        : 0,
    minPrice:
      range.flights.length > 0
        ? Math.min(...range.flights.map((f) => f.price.total))
        : 0,
    maxPrice:
      range.flights.length > 0
        ? Math.max(...range.flights.map((f) => f.price.total))
        : 0,
  }));
};

export const calculatePriceStats = (flights) => {
  if (!flights || flights.length === 0) return null;
  const prices = flights.map((f) => f.price.total);
  const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;
  return {
    average: Math.round(avg),
    lowest: Math.round(Math.min(...prices)),
    highest: Math.round(Math.max(...prices)),
  };
};
