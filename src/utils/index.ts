export const convertSecondsToTime = (seconds: number): string => {
  let minutes = Number((seconds / (1000 * 60)).toFixed(1));
  let hours = Number((seconds / (1000 * 60 * 60)).toFixed(1));
  let days = Number((seconds / (1000 * 60 * 60 * 24)).toFixed(1));

  if (seconds < 60) return seconds + "s";
  else if (minutes < 60) return minutes + "m";
  else if (hours < 24) return hours + "h";
  else return days + "d";
};
