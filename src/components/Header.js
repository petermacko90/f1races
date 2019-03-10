import React from 'react';

const Header = ({ setRoute, route }) => {
  return (
    <header>
      <h1 className='p10'>F1 Races</h1>
      <nav>
        <button onClick={setRoute('RaceList')}
        className={route === 'RaceList' ? 'active' : ''}>
          Calendar
        </button>
        <button onClick={setRoute('Notifications')}
        className={route === 'Notifications' ? 'active' : ''}>
          Saved Notifications
        </button>
      </nav>
    </header>
  );
}

export default Header;
