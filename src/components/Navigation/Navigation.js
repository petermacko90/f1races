import React from 'react';
import PropTypes from 'prop-types';
import './Navigation.css';
import NavItem from './NavItem';

export default function Navigation({ setRoute, route }) {
  return (
    <nav>
      <NavItem
        setRoute={setRoute}
        route="RaceList"
        active={route === 'RaceList'}
      >
        Calendar
      </NavItem>
      <NavItem
        setRoute={setRoute}
        route="Standings"
        active={route === 'Standings'}
      >
        Standings
      </NavItem>
      {/* <NavItem
        setRoute={setRoute}
        route="SavedData"
        active={route === 'SavedData'}
      >
        Saved Data
      </NavItem> */}
    </nav>
  );
}

Navigation.propTypes = {
  route: PropTypes.string.isRequired,
  setRoute: PropTypes.func.isRequired
};
