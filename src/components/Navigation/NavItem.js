import React, { useContext } from 'react';
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
