import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../ThemeContext';

export default function NavItem({ setRoute, route, active, children }) {
  const theme = useContext(ThemeContext);

  return (
    <button
      onClick={() => setRoute(route)}
      className={`${active ? ('active bg-' + theme) : ''} h-${theme}`}
    >
      {children}
    </button>
  );
}

NavItem.propTypes = {
  route: PropTypes.string.isRequired,
  setRoute: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
};
