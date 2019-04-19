import React from 'react';
import { ThemeConsumer } from '../ThemeContext';
import './Navigation.css';

const Navigation = ({ setRoute, route }) => {
  return (
    <ThemeConsumer>
      {theme =>
        <nav>
          <button
            onClick={setRoute('RaceList')}
            className={`${route === 'RaceList' ? 'active' : ''} ${theme}`}
          >
            Calendar
          </button>
          <button
            onClick={setRoute('Standings')}
            className={`${route === 'Standings' ? 'active' : ''} ${theme}`}
          >
            Standings
          </button>
          <button
            onClick={setRoute('Notifications')}
            className={`${route === 'Notifications' ? 'active' : ''} ${theme}`}
          >
            Saved Notifications
          </button>
          <button
            onClick={setRoute('Calendars')}
            className={`${route === 'Calendars' ? 'active' : ''} ${theme}`}
          >
            Saved Calendars
          </button>
        </nav>
      }
    </ThemeConsumer>
  );
}

export default Navigation;
