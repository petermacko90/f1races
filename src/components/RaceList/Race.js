import React from 'react';
import PropTypes from 'prop-types';
import './Race.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getDate } from '../../helpers';

export default function Race({
  round, country, locality, date, time, upcomingRace, selectRace
}) {
  let raceClasses = 'race unselectable';
  raceClasses += Number(round) % 2 === 1 ? ' striped' : '';
  raceClasses += upcomingRace ? ' upcoming' : '';
  const dateTime = getDate(date, time);

  return (
    <div
      className={raceClasses}
      onClick={() => selectRace(round)}
      onKeyPress={(e) => { if (e.key === 'Enter') selectRace(round) }}
      title="Show details"
      tabIndex={0}
    >
      <span className="round">{round}.</span>
      <span className="location">{country}, {locality}</span>
      <span className="date-time">
        <span className="date">{dateTime.toLocaleDateString()}</span>
        <span className="time">
          {time && dateTime.toLocaleTimeString()}
        </span>
      </span>
      <span className="arrow">
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </div>
  );
}

Race.propTypes = {
  round: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  locality: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string,
  upcomingRace: PropTypes.bool.isRequired,
  selectRace: PropTypes.func.isRequired
};
