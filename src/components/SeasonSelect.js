import React, { useContext } from 'react';
import './SeasonSelect.css';
import { FIRST_SEASON, CURRENT_SEASON } from '../constants';
import { ThemeContext } from '../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SeasonSelect = ({ season, onChangeSeason }) => {
  const theme = useContext(ThemeContext);

  let seasonOptions = [];
  for (let i = FIRST_SEASON; i <= CURRENT_SEASON; i++) {
    seasonOptions.push(<option key={i} value={i}>Season {i}</option>);
  }

  return (
    <div className='season ml3 mb3'>
      { season !== FIRST_SEASON &&
        <button
          onClick={() => onChangeSeason(season - 1)}
          title='Previous season'
          className={`button bg-${theme} b-${theme}`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      }
      <select
        value={season}
        onChange={(e) => onChangeSeason(Number(e.target.value))}
        className={'b-' + theme}
        aria-label='Select season'
      >
        {seasonOptions}
      </select>
      { season !== CURRENT_SEASON &&
        <button
          onClick={() => onChangeSeason(season + 1)}
          title='Next season'
          className={`button bg-${theme} b-${theme}`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      }
    </div>
  );
}

export default SeasonSelect;
