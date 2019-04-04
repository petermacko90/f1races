import React from 'react';
import { ThemeConsumer } from '../ThemeContext';
import { notificationOptions } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const AddNotification = ({
  addNotification, raceName, dateTime, notificationWhen, setNotificationWhen
}) => {
  let options = [];
  for (const [key, value] of Object.entries(notificationOptions)) {
    options.push(<option key={key} value={key}>{value + ' Before'}</option>);
  }

  return (
    <ThemeConsumer>
      {theme =>
        <div>
          <button className={'button ' + theme}
          onClick={addNotification(raceName, dateTime, notificationWhen)}>
            <FontAwesomeIcon icon={faBell} /> Add notification
          </button>
          <select value={notificationWhen} onChange={setNotificationWhen}
          className={theme}>
            {options}
          </select>
        </div>
      }
    </ThemeConsumer>
  );
}

export default AddNotification;
