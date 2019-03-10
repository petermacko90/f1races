import React from 'react';
import { ThemeConsumer } from '../ThemeContext';

const Header = ({ setRoute, route }) => {
  return (
    <ThemeConsumer>
      {theme =>
        <header className={theme}>
          <h1 className={'p10 ' + theme}>F1 Races</h1>
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
