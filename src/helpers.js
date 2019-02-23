export const getDate = (date, time) => {
  return time ? new Date(date + ' ' + time) : new Date(date);
}
