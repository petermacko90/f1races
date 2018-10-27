import React from 'react';
import './RaceDetails.css';

const RaceDetails = ({ race, selectRace }) => {
  return (
    <div className='race-details'>
      <button type='button' onClick={selectRace(null)} className='back-button'>
        &lt; Back to all races
      </button>
      <h2>Race Details</h2>
      <p>Season: {race.season}</p>
      <p>Round: {race.round}</p>
      <p>
        Location: {race.Circuit.Location.country}, {race.Circuit.Location.locality}
      </p>
    </div>
  );
}

export default RaceDetails;
