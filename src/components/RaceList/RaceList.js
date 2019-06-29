import React from 'react';
import Race from './Race';
import LoadingIndicator from '../LoadingIndicator';
import { ThemeConsumer } from '../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
const RaceList = ({
  races, upcomingRace, isLoading, error, onClickRace, onEnterRace, onSaveRaces,
  seasonSelect
}) => {
  return (
    <ThemeConsumer>
      {theme =>
        <div className='container'>
          {seasonSelect}
          {races &&
            <button
              onClick={onSaveRaces}
              className={`button ml3 mb3 bg-${theme} b-${theme}`}
            >
              <FontAwesomeIcon icon={faSave} /> Save calendar
            </button>
          }
          { isLoading && <LoadingIndicator /> }
          { error && <p className='p3'>{error.message}</p> }
          { races &&
            races.map(race => {
              return (
                <Race
                  key={race.round}
                  round={race.round}
                  country={race.Circuit.Location.country}
                  locality={race.Circuit.Location.locality}
                  date={race.date}
                  time={race.time}
                  upcomingRace={Number(race.round) === Number(upcomingRace)}
                  onClickRace={onClickRace}
                  onEnterRace={onEnterRace}
                />
              );
            })
          }
        </div>
      }
    </ThemeConsumer>
  );
}

export default RaceList;
