import React from 'react';

const Race = ({
  round, country, locality, date, time, upcomingRace,
  onClickRace, onEnterRace
}) => {
  const striped = Number(round) % 2 === 1 ? ' striped' : '';
  const upcoming = upcomingRace ? ' upcoming' : '';
  const dateTime = time ? new Date(date + ' ' + time) : new Date(date);

  return (
    <div className={'race unselectable' + striped + upcoming} tabIndex='0'
    onClick={onClickRace(round)} onKeyPress={onEnterRace(round)}
    title='Show details'>
      <span className='round'>{round}.</span>
      <span className='location'>{country}, {locality}</span>
      <span className='date-time'>
        <span className='date'>{dateTime.toLocaleDateString()}</span>
        <span className='time'>{ time && dateTime.toLocaleTimeString() }</span>
      </span>
    </div>
  );
}

export default Race;
