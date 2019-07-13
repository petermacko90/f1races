import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { racePropType } from '../../propTypes';
import Race from './Race';
import LoadingIndicator from '../LoadingIndicator';
import { ThemeContext } from '../../ThemeContext';
import { getIsSavedCalendar, removeCalendar } from '../../localStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export default function RaceList({
  races, season, upcomingRace, isLoading, error, isSavedCalendarInit,
  selectRace, onSaveRaces, seasonSelect
}) {
  const theme = useContext(ThemeContext);

  const [isSavedCalendar, setIsSavedCalendar] = useState(false);
  useEffect(() => {
    setIsSavedCalendar(getIsSavedCalendar('calendar_' + season));
  }, [season, isSavedCalendarInit]);

  function onSaveCalendar(races, season) {
    const success = onSaveRaces(races, season);
    if (success) setIsSavedCalendar(true);
  }

  function onRemoveCalendar(calendar) {
    const error = removeCalendar(calendar);
    if (error) {
      toast.error('Error - calendar was not deleted :(');
    } else {
      setIsSavedCalendar(false);
      toast.success('Calendar was removed from browser storage');
    }
  }

  return (
    <div className="container">
      {seasonSelect}
      {races && !isSavedCalendar && (
        <button
          onClick={() => onSaveCalendar(races, season)}
          className={`button ml3 mb3 bg-${theme} b-${theme}`}
        >
          <FontAwesomeIcon icon={faSave} /> Save calendar
        </button>
      )}
      {isSavedCalendar && (
        <button
         onClick={() => onRemoveCalendar('calendar_' + season)}
         className={`button ml3 mb3 bg-${theme} b-${theme}`}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Remove calendar
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
  season: PropTypes.number.isRequired,
  upcomingRace: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  isSavedCalendarInit: PropTypes.bool.isRequired,
  selectRace: PropTypes.func.isRequired,
  onSaveRaces: PropTypes.func.isRequired,
  seasonSelect: PropTypes.element.isRequired
};
