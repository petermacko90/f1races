import { teams } from './constants';

export const getCalendars = () => {
  try {
    let calendars = [];
    for (let i = 0, l = localStorage.length; i < l; i++) {
      if (/^calendar_\d{4}$/.test(localStorage.key(i))) {
        calendars.push(localStorage.key(i));
      }
    }
    return calendars;
  } catch (error) {
    return [];
  }
}

export const saveRaces = (races, season) => {
  try {
    const serializedRaces = JSON.stringify(races);
    localStorage.setItem('calendar_' + season, serializedRaces);
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

export const saveNotifications = (notifications) => {
  try {
    const serializedNotifications = JSON.stringify(notifications);
    localStorage.setItem('notifications', serializedNotifications);
  } catch (error) {
    return error;
  }
}

export const loadNotifications = () => {
  try {
    const serializedNotifications = localStorage.getItem('notifications');
    if (serializedNotifications === null) return undefined;
    return JSON.parse(serializedNotifications, (key, value) => {
      if (key === 'notificationDate' || key === 'raceDate') {
        return new Date(value);
      } else {
        return value;
      }
    });
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
    for (let i = 0, l = teams.length; i < l; i++) {
      if (teams[i].id === theme) {
        return theme;
      }
    }
    return 'ferrari';
  } catch (error) {
    return 'ferrari';
  }
}
