export const getDate = (date, time) => {
  return time ? new Date(date + 'T' + time) : new Date(date);
}
