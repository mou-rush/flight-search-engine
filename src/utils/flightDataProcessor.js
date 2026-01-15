export const sortFlights = (flights, sortBy = "price") => {
  const sortedFlights = [...flights];

  switch (sortBy) {
    case "price":
      return sortedFlights.sort((a, b) => a.price.total - b.price.total);
    case "duration":
      return sortedFlights.sort((a, b) => {
        const durationA = parseDuration(a.itineraries[0].duration);
        const durationB = parseDuration(b.itineraries[0].duration);
        return durationA - durationB;
      });
    case "stops":
      return sortedFlights.sort((a, b) => a.numberOfStops - b.numberOfStops);
    case "departure":
      return sortedFlights.sort((a, b) => {
        const timeA = new Date(a.itineraries[0].segments[0].departure.at);
        const timeB = new Date(b.itineraries[0].segments[0].departure.at);
        return timeA - timeB;
      });
    default:
      return sortedFlights;
  }
};

const parseDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);
  if (!match) return 0;

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;

  return hours * 60 + minutes;
};
