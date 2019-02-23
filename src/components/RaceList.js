import React from 'react';
import Race from './Race';

const RaceList = ({
  races, upcomingRace, isLoading, error, onClickRace, onEnterRace
}) => {
  return (
    <div className='container'>
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
    </div>
  );
}

export default RaceList;
