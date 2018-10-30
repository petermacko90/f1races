import React from 'react';
import LocalDate from './LocalDate';
import LocalTime from './LocalTime';
import './RaceDetails.css';

const RaceDetails = ({ race, onClickRace }) => {
  return (
    <div className='race-details'>
      <button type='button' onClick={onClickRace(null)} className='back-button'>
        &lt; Back to all races
      </button>
      <h2>Race Details</h2>
      <p>Season: {race.season}</p>
      <p>Round: {race.round}</p>
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
    </div>
  );
}

export default RaceDetails;
