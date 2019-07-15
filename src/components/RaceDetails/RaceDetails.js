import React from 'react';
import PropTypes from 'prop-types';
import { racePropType, resultPropType } from '../../propTypes';
import './RaceDetails.css';
import Button from '../Button';
import RaceResults from './RaceResults';
import LoadingIndicator from '../LoadingIndicator';
import { getDate } from '../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkAlt, faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons';

export default function RaceDetails({
  race, raceCount, results, isLoadingResults, resultsError, selectRace,
  getRaceResults
}) {
  const dateTime = getDate(race.date, race.time);
  const round = Number(race.round);

  return (
    <>
      <div className="container responsive-padding">
        <div className="prev-next mb3">
          <Button
            classes="button-left mr3"
            onClick={() => selectRace(round - 1)}
            disabled={round === 1}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Previous Race
          </Button>
          <Button
            classes="button-right"
            onClick={() => selectRace(round + 1)}
            disabled={round === raceCount}
          >
            Next Race <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </div>
        <h2>Race Details</h2>
        <p>Race: <a href={race.url} className="break-word" target="_blank" rel="noopener noreferrer">
          {race.raceName} <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a></p>
        <p>Season: {race.season}</p>
        <p>Round: {round}</p>
        <p>
          Location: {race.Circuit.Location.country}, {race.Circuit.Location.locality}
        </p>
        <p>Circuit: <a href={race.Circuit.url} className="break-word" target="_blank" rel="noopener noreferrer">
          {race.Circuit.circuitName} <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a></p>
        <p>
          Date and time: {dateTime.toLocaleDateString()} {race.time && dateTime.toLocaleTimeString()}
        </p>
        {!results && (
          <Button
            onClick={() => getRaceResults(race.season, round)}
            disabled={isLoadingResults}
          >
            {isLoadingResults ? <LoadingIndicator /> : <>Load Results</>}
          </Button>
        )}
        {resultsError && <p>{resultsError.message}</p>}
      </div>
      {results && <RaceResults results={results} />}
    </>
  );
}

RaceDetails.propTypes = {
  race: PropTypes.shape(racePropType).isRequired,
  raceCount: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape(resultPropType)),
  isLoadingResults: PropTypes.bool.isRequired,
  resultsError: PropTypes.object,
  selectRace: PropTypes.func.isRequired,
  getRaceResults: PropTypes.func.isRequired
};
