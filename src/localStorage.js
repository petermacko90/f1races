import { TEAMS } from './constants';

export const getIsSavedCalendar = (calendar) => {
  try {
    if (localStorage.getItem(calendar) !== null) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export const removeCalendar = (calendar) => {
  try {
    localStorage.removeItem(calendar);
  } catch (error) {
    return error;
  }
}

export const saveRaces = (races, season) => {
  try {
    localStorage.setItem('calendar_' + season, JSON.stringify(races));
  } catch (error) {
    return error;
  }
}

export const loadRaces = (season) => {
  try {
    const serializedRaces = localStorage.getItem('calendar_' + season);
    if (serializedRaces === null) return undefined;
    return JSON.parse(serializedRaces);
  } catch (error) {
    return undefined;
  }
}

export const saveTheme = (theme) => {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    return undefined;
  }
}

export const loadTheme = () => {
  try {
    const theme = localStorage.getItem('theme');
    for (let i = 0, l = TEAMS.length; i < l; i++) {
      if (TEAMS[i].id === theme) {
        return theme;
      }
    }
    return 'ferrari';
  } catch (error) {
    return 'ferrari';
  }
}
