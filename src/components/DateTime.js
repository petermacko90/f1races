import React, { Fragment } from 'react';
import './DateTime.css';

const DateTime = ({ date, time }) => {
  const localDate = new Date(date + ' ' + time);

  return (
    <Fragment>
      <span className='date'>{localDate.toLocaleDateString()}</span>
      <span className='time'>{localDate.toLocaleTimeString()}</span>
    </Fragment>
  );
}

export default DateTime;
