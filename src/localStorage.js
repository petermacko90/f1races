import { TEAMS } from './constants';

export const getCalendars = () => {
  try {
    let calendars = [];
    for (let i = 0, l = localStorage.length; i < l; i++) {
      if (/^calendar_\d{4}$/.test(localStorage.key(i))) {
        calendars.push(localStorage.key(i));
      }
    }
    return calendars.sort((a, b) => a.slice(-4) - b.slice(-4));
  } catch (error) {
    return [];
  }
}

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

export const saveNotifications = (notifications) => {
  try {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  } catch (error) {
    return error;
  }
}

export const loadNotifications = () => {
  try {
    const serializedNotifications = localStorage.getItem('notifications');
    if (serializedNotifications === null) return undefined;
    const notifications = JSON.parse(serializedNotifications, (key, value) => {
      if (key === 'notificationDate' || key === 'raceDate') {
        return new Date(value);
      } else {
        return value;
      }
    });
    return notifications.sort((a, b) => a.notificationDate - b.notificationDate);
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
