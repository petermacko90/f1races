import React, { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';

const NavItem = ({ setRoute, route, active, children }) => {
  const theme = useContext(ThemeContext);

  return (
    <button
      onClick={setRoute(route)}
      className={`${active ? ('active bg-' + theme) : ''} h-${theme}`}
    >
      {children}
    </button>
  );
}

export default NavItem;
