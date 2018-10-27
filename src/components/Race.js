import React from 'react';
import DateTime from './DateTime';
import './Race.css';

const Race = ({
  round, country, locality, date, time, upcomingRace, selectRace
}) => {
  const striped = Number(round) % 2 === 1 ? ' striped' : '';
  const upcoming = upcomingRace ? ' upcoming' : '';

  return (
    <div className={'race unselectable' + striped + upcoming}
    onClick={selectRace(round)} title='Show details'>
      <span className='round'>{round}.</span>
      <span className='location'>{country}, {locality}</span>
      <span className='date-time'>
        <DateTime date={date} time={time} />
      </span>
    </div>
  );
}

export default Race;
