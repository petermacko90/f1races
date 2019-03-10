import React from 'react';
import { FIRST_SEASON } from '../constants';

const SeasonSelect = ({ season, onSelectSeason, onChangeSeason }) => {
  let seasonOptions = [];
  for (let i = FIRST_SEASON, d = new Date().getFullYear(); i <= d; i++) {
    seasonOptions.push(<option key={i} value={i}>Season {i}</option>);
  }

  return (
    <div className='season ml10 mb10'>
      <button onClick={onChangeSeason(-1)} title='Previous season'
      className='button'>
        &lt;
      </button>
      <select value={season} onChange={onSelectSeason}
      className='p10 season-select' aria-label='Select season'>
        {seasonOptions}
      </select>
      <button onClick={onChangeSeason(1)} title='Next season'
      className='button'>
        &gt;
      </button>
    </div>
  );
}

export default SeasonSelect;
