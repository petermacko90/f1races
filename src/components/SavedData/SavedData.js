import React from 'react';
import Calendars from './Calendars';

const SavedData = ({ savedNotifications }) => {
  return (
    <div className='container'>
      {savedNotifications}
      <Calendars />
    </div>
  );
}

export default SavedData;
