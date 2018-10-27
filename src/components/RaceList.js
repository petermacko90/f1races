import React from 'react';
import Race from './Race';
import './RaceList.css';

const RaceList = ({ races, upcomingRace }) => {
  return (
    <div className="race-list">
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
            />
          );
        })
      }
    </div>
  );
}

export default RaceList;
