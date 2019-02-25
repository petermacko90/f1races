import React from 'react';
import Race from './Race';
import SeasonSelect from './SeasonSelect';

const RaceList = ({
  races, upcomingRace, isLoading, error, season,
  onSelectSeason, onChangeSeason, onClickRace, onEnterRace, onSaveRaces
}) => {
  if (!races) return null;
  return (
    <div className='container'>
      <SeasonSelect season={season} onSelectSeason={onSelectSeason} />
      <button onClick={onChangeSeason(-1)}>
        Previous season
      </button>
      <button onClick={onChangeSeason(1)}>
        Next season
      </button>
      <button onClick={onSaveRaces}>Save</button>
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
