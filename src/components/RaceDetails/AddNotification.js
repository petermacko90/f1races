import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import { notificationOptions } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const AddNotification = ({
  addNotification, raceName, dateTime, notificationWhen, setNotificationWhen
}) => {
  const theme = useContext(ThemeContext);

  let options = [];
  for (const [key, value] of Object.entries(notificationOptions)) {
    options.push(<option key={key} value={key}>{value + ' Before'}</option>);
  }

  return (
    <div>
      <button
        className={`button bg-${theme} b-${theme}`}
        onClick={addNotification(raceName, dateTime, notificationWhen)}
      >
        <FontAwesomeIcon icon={faBell} /> Add notification
      </button>
      <select
        value={notificationWhen}
        onChange={setNotificationWhen}
        className={'b-' + theme}
        aria-label='Select notification time'
      >
        {options}
      </select>
    </div>
  );
}

export default AddNotification;
