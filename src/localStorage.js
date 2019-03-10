import Joi from 'joi';

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
    const notificationObject = Joi.object().keys({
      body: Joi.string().required(),
      raceDate: Joi.date().required(),
      notificationDate: Joi.date().required(),
      notified: Joi.boolean().required(),
      title: Joi.string().required()
    });
    const schema = Joi.array().items(notificationObject);

    const serializedNotifications = localStorage.getItem('notifications');
    if (serializedNotifications === null) return undefined;
    const notifications = JSON.parse(serializedNotifications, (key, value) => {
      if (key === 'notificationDate' || key === 'raceDate') {
        return new Date(value);
      } else {
        return value;
      }
    });
    
    const test = Joi.validate(notifications, schema);
    if (test.error) {
      localStorage.removeItem('notifications');
      return undefined;
    } else {
      return notifications;
    }
  } catch (error) {
    return undefined;
  }
}
