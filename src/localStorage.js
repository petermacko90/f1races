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

export const saveNotifications = (notifications) => {
  try {
    const serializedNotifications = JSON.stringify(notifications);
    localStorage.setItem('notifications', serializedNotifications);
  } catch (error) {
    console.error('save to localStorage error', error);
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
