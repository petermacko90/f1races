import React, { Fragment } from 'react';
import Race from './Race';

const RaceList = ({
  races, upcomingRace, isLoading, error, onClickRace, onEnterRace, onSaveRaces
}) => {
  if (!races) return null;
  return (
    <Fragment>
      <button onClick={onSaveRaces} className='button ml10 mb10'>
        Save calendar
      </button>
      { isLoading && <p className='message'>Loading...</p> }
      { error && <p className='message'>{error.message}</p> }
      {
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
  );
}

export default RaceList;
