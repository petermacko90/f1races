import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { ThemeContext } from '../ThemeContext';
import { TEAMS } from '../constants';

export default function Header({ setTheme }) {
  const theme = useContext(ThemeContext);

  return (
    <header className={'bg-' + theme}>
      <div className="flex">
        <h1 className={'dib ' + theme}>F1 Races</h1>
        <div className="select-wrapper">
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className={'b-' + theme}
            aria-label="Select theme"
          >
            {TEAMS.map(team => (
              <option
                key={team.id}
                value={team.id}
                className={'bg-' + team.id}
              >
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  setTheme: PropTypes.func.isRequired
};
