import React from 'react';
import { ThemeConsumer } from '../ThemeContext';

const AddNotification = ({ addNotification, raceName, dateTime }) => {
  return (
    <ThemeConsumer>
      {theme =>
        <div>
          <button onClick={addNotification(raceName, dateTime, '1H')}
          className={'button ' + theme}>
            Add notification
          </button>
        </div>
      }
    </ThemeConsumer>
  );
}

export default AddNotification;
