import React, { Fragment } from 'react';
import Race from './Race';
import { ThemeConsumer } from '../ThemeContext';

const RaceList = ({
  races, upcomingRace, isLoading, error, onClickRace, onEnterRace, onSaveRaces
}) => {
  return (
    <ThemeConsumer>
      {theme =>
        <Fragment>
          { !error && !isLoading &&
            <button onClick={onSaveRaces}
            className={'button ml10 mb10 ' + theme}>
              Save calendar
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
        </Fragment>
      }
    </ThemeConsumer>
  );
}

export default RaceList;
