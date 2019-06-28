import React from 'react';
import './Race.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getDate } from '../../helpers';

const Race = ({
  round, country, locality, date, time, upcomingRace,
  onClickRace, onEnterRace
}) => {
  let raceClasses = 'race unselectable';
  raceClasses += Number(round) % 2 === 1 ? ' striped' : '';
  raceClasses += upcomingRace ? ' upcoming' : '';
  const dateTime = getDate(date, time);

  return (
    <div
      className={raceClasses}
      onClick={onClickRace(round)}
      onKeyPress={onEnterRace(round)}
      title='Show details'
      tabIndex='0'
    >
      <span className='round'>{round}.</span>
      <span className='location'>{country}, {locality}</span>
      <span className='date-time'>
        <span className='date'>{dateTime.toLocaleDateString()}</span>
        <span className='time'>
          {time && dateTime.toLocaleTimeString()}
        </span>
      </span>
      <span className='arrow'>
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </div>
  );
}

export default Race;
