import React from 'react';
import Race from './Race';
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
          { !error && !isLoading &&
            <button onClick={onSaveRaces}
            className={'button ml10 mb10 ' + theme}>
              <FontAwesomeIcon icon={faSave} /> Save calendar
            </button>
          }
          { isLoading && <p className='p10'>Loading...</p> }
          { error && <p className='p10'>{error.message}</p> }
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
