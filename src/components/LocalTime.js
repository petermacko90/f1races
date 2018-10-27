import React, { Fragment } from 'react';

const LocalTime = ({ date, time }) => {
  return (
    <Fragment>{new Date(date + ' ' + time).toLocaleTimeString()}</Fragment>
  );
}

export default LocalTime;
