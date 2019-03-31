import React from 'react';
import './SeasonSelect.css';
import { FIRST_SEASON, CURRENT_SEASON } from '../constants';
import { ThemeConsumer } from '../ThemeContext';

const SeasonSelect = ({ season, onSelectSeason, onChangeSeason }) => {
  let seasonOptions = [];
  for (let i = FIRST_SEASON; i <= CURRENT_SEASON; i++) {
    seasonOptions.push(<option key={i} value={i}>Season {i}</option>);
  }

  return (
    <ThemeConsumer>
      {theme =>
        <div className='season ml10 mb10'>
          { season !== FIRST_SEASON &&
            <button onClick={onChangeSeason(-1)} title='Previous season'
            className={'button ' + theme}>
              &lt;
            </button>
          }
          <select value={season} onChange={onSelectSeason}
          className={theme} aria-label='Select season'>
            {seasonOptions}
          </select>
          { season !== CURRENT_SEASON &&
            <button onClick={onChangeSeason(1)} title='Next season'
            className={'button ' + theme}>
              &gt;
            </button>
          }
        </div>
      }
    </ThemeConsumer>
  );
}

export default SeasonSelect;
