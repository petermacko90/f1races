import React from 'react';
import './Header.css';
import { ThemeConsumer } from '../ThemeContext';
import { teams } from '../constants';

const Header = ({ setTheme }) => {
  return (
    <ThemeConsumer>
      {theme =>
        <header className={theme}>
          <div className='flex'>
            <h1 className={'dib p10 ' + theme}>F1 Races</h1>
            <div className='select-wrapper'>
              <select
                value={theme}
                onChange={setTheme}
                className={theme}
                aria-label='Select theme'
              >
                {
                  teams.map(team => {
                    return (
                      <option
                        key={team.id}
                        value={team.id}
                        className={team.id}
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
      }
    </ThemeConsumer>
  );
}

export default Header;
