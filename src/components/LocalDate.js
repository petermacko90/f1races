import React, { Fragment } from 'react';

const LocalDate = ({ date, time }) => {
  return (
    <Fragment>{new Date(date + ' ' + time).toLocaleDateString()}</Fragment>
  );
}

export default LocalDate;
