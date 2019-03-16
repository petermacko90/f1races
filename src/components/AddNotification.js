import React from 'react';
import { ThemeConsumer } from '../ThemeContext';
import { notificationOptions } from '../constants';

const AddNotification = ({
  addNotification, raceName, dateTime, notificationWhen, setNotificationWhen
}) => {
  const options = [];
  for (const [key, value] of Object.entries(notificationOptions)) {
    options.push(<option key={key} value={key}>{value + ' Before'}</option>);
  }
  return (
    <ThemeConsumer>
      {theme =>
        <div>
          <button className={'button ' + theme}
          onClick={addNotification(raceName, dateTime, notificationWhen)}>
            Add notification
          </button>
          <select value={notificationWhen} onChange={setNotificationWhen}>
            {options}
          </select>
        </div>
      }
    </ThemeConsumer>
  );
}

export default AddNotification;
