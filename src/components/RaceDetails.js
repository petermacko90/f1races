import React from 'react';
import RaceResults from './RaceResults';
import { getDate } from '../helpers';
import { ThemeConsumer } from '../ThemeContext';

const RaceDetails = ({
  race, raceCount, results, isLoadingResults, resultsError,
  onClickRace, getRaceResults, addNotification
}) => {
  const dateTime = getDate(race.date, race.time);
  const round = Number(race.round);

  return (
    <ThemeConsumer>
      {theme =>
        <div className='ml10 mr10 container'>
          <div className='prev-next mb10 mt10'>
            {
              round !== 1 &&
                <button className={'button button-left mr10 ' + theme}
                onClick={onClickRace(round - 1)}>
                  Previous Race
                </button>
            }
            {
              round !== raceCount &&
                <button className={'button button-right ' + theme}
                onClick={onClickRace(round + 1)}>
                  Next Race
                </button>
            }
          </div>
          <button onClick={addNotification(race.raceName, dateTime, '1H')}
          className={'button ' + theme}>
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
          <p>Race URL: <a href={race.url} className='break-word'
          target='_blank' rel='noopener noreferrer'>
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
              <button onClick={getRaceResults(race.season, round)}
              className={'button ' + theme}>
                Load Results
              </button>
          }
          { isLoadingResults && <p>Loading...</p> }
          { resultsError && <p>{resultsError.message}</p> }
        </div>
      }
    </ThemeConsumer>
  );
}

export default RaceDetails;
