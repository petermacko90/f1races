import React from 'react';
import { FIRST_SEASON } from '../constants';

const SeasonSelect = ({ season, onSelectSeason }) => {
  let seasonOptions = [];
  for (let i = FIRST_SEASON, d = new Date().getFullYear(); i <= d; i++) {
    seasonOptions.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <div className='season-select'>
      <label>
        Season:&nbsp;
        <select value={season} onChange={onSelectSeason}>
          {seasonOptions}
        </select>
      </label>
    </div>
  );
}

export default SeasonSelect;
