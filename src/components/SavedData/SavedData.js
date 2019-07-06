import React from 'react';
import Calendars from './Calendars';

export default function SavedData({ savedNotifications }) {
  return (
    <div className="container">
      {savedNotifications}
      <Calendars />
    </div>
  );
}
