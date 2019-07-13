import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { racePropType } from '../../propTypes';
import Race from './Race';
import LoadingIndicator from '../LoadingIndicator';
import { ThemeContext } from '../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

export default function RaceList({
  races, upcomingRace, isLoading, error, selectRace, onSaveRaces, seasonSelect
}) {
  const theme = useContext(ThemeContext);

  return (
    <div className="container">
      {seasonSelect}
      {races && (
        <button
          onClick={() => onSaveRaces()}
          className={`button ml3 mb3 bg-${theme} b-${theme}`}
        >
          <FontAwesomeIcon icon={faSave} /> Save calendar
        </button>
      )}
      {isLoading && <div className="p3"><LoadingIndicator /></div>}
      {error && <p className="p3">{error.message}</p>}
      {races && (
        races.map(race => (
          <Race
            key={race.round}
            round={race.round}
            country={race.Circuit.Location.country}
            locality={race.Circuit.Location.locality}
            date={race.date}
            time={race.time}
            upcomingRace={Number(race.round) === Number(upcomingRace)}
            selectRace={selectRace}
          />
        ))
      )}
    </div>
  );
}

RaceList.propTypes = {
  races: PropTypes.arrayOf(PropTypes.shape(racePropType)),
  upcomingRace: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  selectRace: PropTypes.func.isRequired,
  onSaveRaces: PropTypes.func.isRequired,
  seasonSelect: PropTypes.element.isRequired
};
