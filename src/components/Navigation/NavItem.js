import React from 'react';
import { ThemeConsumer } from '../../ThemeContext';

const NavItem = ({ setRoute, route, active, children }) => {
  return (
    <ThemeConsumer>
      {theme =>
        <button
          onClick={setRoute(route)}
          className={`${active ? ('active bg-' + theme) : ''} h-${theme}`}
        >
          {children}
        </button>
      }
    </ThemeConsumer>
  );
}

export default NavItem;
