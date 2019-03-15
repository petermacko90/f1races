import Joi from 'joi';
import { teams } from './constants';

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
    const locationObject = Joi.object().keys({
      lat: Joi.string(),
      long: Joi.string(),
      locality: Joi.string().required(),
      country: Joi.string().required()
    });
    const circuitObject = Joi.object().keys({
      circuitId: Joi.string(),
      url: Joi.string().required(),
      circuitName: Joi.string().required(),
      Location: locationObject
    });
    const raceObject = Joi.object().keys({
      season: Joi.string().required(),
      round: Joi.string().required(),
      url: Joi.string().required(),
      raceName: Joi.string().required(),
      Circuit: circuitObject,
      date: Joi.string().required(),
      time: Joi.string()
    });
    const schema = Joi.array().items(raceObject);

    const serializedRaces = localStorage.getItem('calendar_' + season);
    if (serializedRaces === null) return undefined;
    const races = JSON.parse(serializedRaces);

    const test = Joi.validate(races, schema);
    if (test.error) {
      localStorage.removeItem('calendar_' + season);
      return undefined;
    } else {
      return races;
    }
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

export const saveTheme = (theme) => {
  try {
    localStorage.setItem('theme', theme);
  } catch (error) {
    console.error('save to localStorage error', error);
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
    console.error('load from localStorage error', error);
    return 'ferrari';
  }
}
