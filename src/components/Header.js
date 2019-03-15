import React from 'react';
import { ThemeConsumer } from '../ThemeContext';
import { teams } from '../constants';

const Header = ({ setRoute, route, setTheme }) => {
  return (
    <ThemeConsumer>
      {theme =>
        <header className={theme}>
          <div>
            <h1 className={'dib p10 ' + theme}>F1 Races</h1>
            <select value={theme} onChange={setTheme}>
              {
                teams.map(team => {
                  return (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  );
                })
              }
              
            </select>
          </div>
          <nav className={theme}>
            <button onClick={setRoute('RaceList')}
            className={`${route === 'RaceList' ? 'active' : ''} ${theme}`}>
              Calendar
            </button>
            <button onClick={setRoute('Notifications')}
            className={`${route === 'Notifications' ? 'active' : ''} ${theme}`}>
              Saved Notifications
            </button>
          </nav>
        </header>
      }
    </ThemeConsumer>
  );
}

export default Header;
