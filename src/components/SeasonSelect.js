import React from 'react';
import './SeasonSelect.css';
import { FIRST_SEASON, CURRENT_SEASON } from '../constants';
import { ThemeConsumer } from '../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SeasonSelect = ({ season, onSelectSeason, onChangeSeason }) => {
  let seasonOptions = [];
  for (let i = FIRST_SEASON; i <= CURRENT_SEASON; i++) {
    seasonOptions.push(<option key={i} value={i}>Season {i}</option>);
  }

  return (
    <ThemeConsumer>
      {theme =>
        <div className='season ml3 mb3'>
          { season !== FIRST_SEASON &&
            <button
              onClick={onChangeSeason(-1)}
              title='Previous season'
              className={`button bg-${theme} b-${theme}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          }
          <select
            value={season}
            onChange={onSelectSeason}
            className={'b-' + theme}
            aria-label='Select season'
          >
            {seasonOptions}
          </select>
          { season !== CURRENT_SEASON &&
            <button
              onClick={onChangeSeason(1)}
              title='Next season'
              className={`button bg-${theme} b-${theme}`}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          }
        </div>
      }
    </ThemeConsumer>
  );
}

export default SeasonSelect;
