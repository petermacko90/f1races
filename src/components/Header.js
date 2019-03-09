import React from 'react';

const Header = ({ setRoute }) => {
  return (
    <header>
      <h1>F1 Races</h1>
      <nav>
        <button onClick={setRoute('RaceList')}>
          Calendar
        </button>
        <button onClick={setRoute('Notifications')}>
          Saved Notifications
        </button>
      </nav>
    </header>
  );
}

export default Header;
