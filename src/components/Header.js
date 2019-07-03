import React, { useContext } from 'react';
import './Header.css';
import { ThemeContext } from '../ThemeContext';
import { teams } from '../constants';

const Header = ({ setTheme }) => {
  const theme = useContext(ThemeContext);

  return (
    <header className={'bg-' + theme}>
      <div className='flex'>
        <h1 className={'dib ' + theme}>F1 Races</h1>
        <div className='select-wrapper'>
          <select
            value={theme}
            onChange={setTheme}
            className={'b-' + theme}
            aria-label='Select theme'
          >
            {
              teams.map(team => {
                return (
                  <option
                    key={team.id}
                    value={team.id}
                    className={'bg-' + team.id}
                  >
                    {team.name}
                  </option>
                );
              })
            }
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
