import React from 'react';
import RaceResults from './RaceResults';
import LocalDate from './LocalDate';
import LocalTime from './LocalTime';

const RaceDetails = ({
  race, raceCount, results, resultsError, onClickRace, getRaceResults
}) => {
  const { season, round } = race;
  const roundNum = Number(round);

  return (
    <div className='race-details container'>
      <button type='button' onClick={onClickRace(null)} className='button'>
        &lt; Back to all races
      </button>
      <div className='prev-next'>
        {
          roundNum !== 1 &&
            <button className='button button-left'
            onClick={onClickRace(roundNum - 1)}>
              &#8678; Previous Race
            </button>
        }
        {
          roundNum !== raceCount &&
            <button className='button button-right'
            onClick={onClickRace(roundNum + 1)}>
              Next Race &#8680;
            </button>
        }
      </div>
      <h2>Race Details</h2>
      <p>Season: {season}</p>
      <p>Round: {round}</p>
      <p>
        Location: {race.Circuit.Location.country}, {race.Circuit.Location.locality}
      </p>
      <p>
        Date and time: <LocalDate date={race.date} time={race.time} /> <LocalTime date={race.date} time={race.time} />
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
          <button type='button' onClick={getRaceResults(season, round)}
          className='button'>
            Load Results
          </button>
      }
      { resultsError && <p>{resultsError.message}</p> }
    </div>
  );
}

export default RaceDetails;
