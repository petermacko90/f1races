import React from 'react';
import Race from './Race';

const RaceList = ({ races, upcomingRace, onClickRace, onEnterRace }) => {
  return (
    <div className='container'>
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
