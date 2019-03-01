import React from 'react';
import { FIRST_SEASON } from '../constants';

const SeasonSelect = ({ season, onSelectSeason, onChangeSeason }) => {
  let seasonOptions = [];
  for (let i = FIRST_SEASON, d = new Date().getFullYear(); i <= d; i++) {
    seasonOptions.push(<option key={i} value={i}>Season {i}</option>);
  }

  return (
    <div className='season-select'>
      <button onClick={onChangeSeason(-1)} title='Previous season'>
        &lt;
      </button>
      <select value={season} onChange={onSelectSeason}
      aria-label='Select season'>
        {seasonOptions}
      </select>
      <button onClick={onChangeSeason(1)} title='Next season'>
        &gt;
      </button>
    </div>
  );
}

export default SeasonSelect;
