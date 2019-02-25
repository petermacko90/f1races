export const saveRaces = (races, season) => {
  try {
    const serializedRaces = JSON.stringify(races);
    localStorage.setItem('calendar_' + season, serializedRaces);
  } catch (error) {
    console.error('save to localStorage error', error);
  }
}

export const loadRaces = (season) => {
  try {
    const serializedRaces = localStorage.getItem('calendar_' + season);
    if (serializedRaces === null) return undefined;
    return JSON.parse(serializedRaces);
  } catch (error) {
    console.error('load from localStorage error', error);
    return undefined;
  }
}
