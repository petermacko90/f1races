import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './SeasonSelect.css';
import { FIRST_SEASON, CURRENT_SEASON } from '../constants';
import { ThemeContext } from '../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from './Button';

export default function SeasonSelect({ season, onChangeSeason }) {
  const theme = useContext(ThemeContext);

  let seasonOptions = [];
  for (let i = FIRST_SEASON; i <= CURRENT_SEASON; i++) {
    seasonOptions.push(<option key={i} value={i}>Season {i}</option>);
  }

  return (
    <div className="season mb3">
      <Button
        onClick={() => onChangeSeason(season - 1)}
        title="Previous season"
        disabled={season === FIRST_SEASON}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <select
        value={season}
        onChange={(e) => onChangeSeason(Number(e.target.value))}
        className={'b-' + theme}
        aria-label="Select season"
      >
        {seasonOptions}
      </select>
      <Button
        onClick={() => onChangeSeason(season + 1)}
        title="Next season"
        disabled={season === CURRENT_SEASON}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
}

SeasonSelect.propTypes = {
  season: PropTypes.number.isRequired,
  onChangeSeason: PropTypes.func.isRequired
};
