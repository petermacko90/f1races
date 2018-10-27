import React from 'react';
import DateTime from './DateTime';
import './Race.css';

const Race = ({ round, country, locality, date, time, upcomingRace }) => {
  const striped = Number(round) % 2 === 1 ? ' striped' : '';
  const upcoming = upcomingRace ? ' upcoming' : '';

  return (
    <div className={'race' + striped + upcoming}>
      <span className='round'>{round}.</span>
      <span className='location'>{country}, {locality}</span>
      <span className='date-time'>
        <DateTime date={date} time={time} />
      </span>
    </div>
  );
}

export default Race;
