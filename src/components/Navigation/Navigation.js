import React from 'react';
import './Navigation.css';
import NavItem from './NavItem';

const Navigation = ({ setRoute, route }) => {
  return (
    <nav>
      <NavItem
        setRoute={setRoute}
        route='RaceList'
        active={route ==='RaceList'}
      >
        Calendar
      </NavItem>
      <NavItem
        setRoute={setRoute}
        route='Standings'
        active={route === 'Standings'}
      >
        Standings
      </NavItem>
      <NavItem
        setRoute={setRoute}
        route='Notifications'
        active={route === 'Notifications'}
      >
        Saved Notifications
      </NavItem>
      <NavItem
        setRoute={setRoute}
        route='Calendars'
        active={route === 'Calendars'}
      >
        Saved Calendars
      </NavItem>
    </nav>
  );
}

export default Navigation;
