import React, { Fragment } from 'react';
import './RaceDetails.css';
import RaceResults from './RaceResults';
import AddNotification from './AddNotification';
import { getDate } from '../../helpers';
import { ThemeConsumer } from '../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkAlt, faChevronLeft, faChevronRight, faSpinner
} from '@fortawesome/free-solid-svg-icons';

const RaceDetails = ({
  race, raceCount, results, isLoadingResults, resultsError, onClickRace,
  getRaceResults, addNotification, notificationWhen, setNotificationWhen
}) => {
  const dateTime = getDate(race.date, race.time);
  const round = Number(race.round);

  return (
    <ThemeConsumer>
      {theme =>
        <Fragment>
          <div className='container p10'>
            <div className='prev-next mb10 mt10'>
              { round !== 1 &&
                <button
                  className={`button button-left mr10 bg-${theme} b-${theme}`}
                  onClick={onClickRace(round - 1)}
                >
                  <FontAwesomeIcon icon={faChevronLeft} /> Previous Race
                </button>
              }
              { round !== raceCount &&
                <button
                  className={`button button-right bg-${theme} b-${theme}`}
                  onClick={onClickRace(round + 1)}
                >
                  Next Race <FontAwesomeIcon icon={faChevronRight} />
                </button>
              }
            </div>
            <AddNotification
              addNotification={addNotification}
              raceName={race.raceName}
              dateTime={dateTime}
              notificationWhen={notificationWhen}
              setNotificationWhen={setNotificationWhen}
            />
            <h2>Race Details</h2>
            <p>Race: <a href={race.url} className='break-word'
            target='_blank' rel='noopener noreferrer'>
              {race.raceName} <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a></p>
            <p>Season: {race.season}</p>
            <p>Round: {round}</p>
            <p>
              Location: {race.Circuit.Location.country}, {race.Circuit.Location.locality}
            </p>
            <p>Circuit: <a href={race.Circuit.url} className='break-word'
            target='_blank' rel='noopener noreferrer'>
              {race.Circuit.circuitName} <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a></p>
            <p>
              Date and time: {dateTime.toLocaleDateString()} {race.time && dateTime.toLocaleTimeString()}
            </p>
            {!results &&
              <button
                onClick={getRaceResults(race.season, round)}
                className={`button bg-${theme} b-${theme}`}
                disabled={isLoadingResults}
              >
                {isLoadingResults
                  ?
                    <Fragment>
                      <FontAwesomeIcon icon={faSpinner} spin={true} /> {'Loading...'}
                    </Fragment>
                  :
                    <Fragment>Load Results</Fragment>
                }
              </button>
            }
            { resultsError && <p>{resultsError.message}</p> }
          </div>
          { results && <RaceResults results={results} /> }
        </Fragment>
      }
    </ThemeConsumer>
  );
}

export default RaceDetails;
