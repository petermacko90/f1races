import React from 'react';
import PropTypes from 'prop-types';
import LocalDate from './LocalDate';
import LocalTime from './LocalTime';
import './Race.css';

const Race = ({
  round, country, locality, date, time, upcomingRace,
  onClickRace, onEnterRace
}) => {
  const striped = Number(round) % 2 === 1 ? ' striped' : '';
  const upcoming = upcomingRace ? ' upcoming' : '';

  return (
    <div className={'race unselectable' + striped + upcoming} tabIndex='0'
    onClick={onClickRace(round)} onKeyPress={onEnterRace(round)}
    title='Show details'>
      <span className='round'>{round}.</span>
      <span className='location'>{country}, {locality}</span>
      <span className='date-time'>
        <span className='date'>
          <LocalDate date={date} time={time} />
        </span>
        <span className='time'>
          <LocalTime date={date} time={time} />
        </span>
      </span>
    </div>
  );
}

Race.propTypes = {
  round: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  locality: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  upcomingRace: PropTypes.bool.isRequired,
  onClickRace: PropTypes.func.isRequired,
  onEnterRace: PropTypes.func.isRequired
};

export default Race;
