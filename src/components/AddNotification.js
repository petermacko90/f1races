import React from 'react';
import CustomSelect from './CustomSelect';
import { ThemeConsumer } from '../ThemeContext';
import { notificationOptions } from '../constants';

const AddNotification = ({
  addNotification, raceName, dateTime, notificationWhen, setNotificationWhen
}) => {
  const options = [];
  for (const [key, value] of Object.entries(notificationOptions)) {
    options.push({id: key, text: value + ' Before' });
  }

  return (
    <ThemeConsumer>
      {theme =>
        <div>
          <button className={'button ' + theme}
          onClick={addNotification(raceName, dateTime, notificationWhen)}>
            Add notification
          </button>
          <CustomSelect
            value={notificationOptions[notificationWhen] + ' Before'}
            onChange={setNotificationWhen}
            options={options}
          />
        </div>
      }
    </ThemeConsumer>
  );
}

export default AddNotification;
