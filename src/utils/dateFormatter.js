import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatDate = (date, format = "MMM DD, YYYY") => {
  return dayjs(date).format(format);
};

export const formatTime = (date) => {
  return dayjs(date).format("HH:mm");
};

export const formatDuration = (isoDuration) => {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  return `${hours}h ${minutes}m`;
};
