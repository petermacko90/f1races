import React from 'react';
import RaceResults from './RaceResults';
import { getDate } from '../helpers';

const RaceDetails = ({
  race, raceCount, results, isLoadingResults, resultsError,
  onClickRace, getRaceResults, addNotification
}) => {
  const dateTime = getDate(race.date, race.time);
  const round = Number(race.round);

  return (
    <div className='race-details container'>
      <div className='prev-next'>
        {
          round !== 1 &&
            <button className='button button-left'
            onClick={onClickRace(round - 1)}>
              &#8678; Previous Race
            </button>
        }
        {
          round !== raceCount &&
            <button className='button button-right'
            onClick={onClickRace(round + 1)}>
              Next Race &#8680;
            </button>
        }
      </div>
      <button onClick={addNotification(race.raceName, dateTime, '1H')}>
        Add notification
      </button>
      <h2>Race Details</h2>
      <p>Season: {race.season}</p>
      <p>Round: {round}</p>
      <p>
        Location: {race.Circuit.Location.country}, {race.Circuit.Location.locality}
      </p>
      <p>
        Date and time: {dateTime.toLocaleDateString()} {race.time && dateTime.toLocaleTimeString()}
      </p>
      <p>Race name: {race.raceName}</p>
      <p>Race URL: <a href={race.url} className='break-word' target='_blank'
      rel='noopener noreferrer'>
        {race.url}
      </a></p>
      <p>Circuit name: {race.Circuit.circuitName}</p>
      <p>Circuit URL: <a href={race.Circuit.url} className='break-word'
      target='_blank' rel='noopener noreferrer'>
        {race.Circuit.url}
      </a></p>
      {
        results ?
          <RaceResults results={results} />
        :
          <button type='button' onClick={getRaceResults(race.season, round)}
          className='button'>
            Load Results
          </button>
      }
      { isLoadingResults && <p>Loading...</p> }
      { resultsError && <p>{resultsError.message}</p> }
    </div>
  );
}

export default RaceDetails;
