import React from 'react';
import { FIRST_SEASON } from '../constants';
import { ThemeConsumer } from '../ThemeContext';

const SeasonSelect = ({ season, onSelectSeason, onChangeSeason }) => {
  let seasonOptions = [];
  for (let i = FIRST_SEASON, d = new Date().getFullYear(); i <= d; i++) {
    seasonOptions.push(<option key={i} value={i}>Season {i}</option>);
  }

  return (
    <ThemeConsumer>
      {theme =>
        <div className='season ml10 mb10'>
          <button onClick={onChangeSeason(-1)} title='Previous season'
          className={'button ' + theme}>
            &lt;
          </button>
          <select value={season} onChange={onSelectSeason}
          className={'p10 season-select ' + theme} aria-label='Select season'>
            {seasonOptions}
          </select>
          <button onClick={onChangeSeason(1)} title='Next season'
          className={'button ' + theme}>
            &gt;
          </button>
        </div>
      }
    </ThemeConsumer>
  );
}

export default SeasonSelect;
