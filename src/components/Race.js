import React from 'react';
import './Race.css';
import { getDate } from '../helpers';
import { ThemeConsumer } from '../ThemeContext';

const Race = ({
  round, country, locality, date, time, upcomingRace,
  onClickRace, onEnterRace
}) => {
  const striped = Number(round) % 2 === 1 ? 'striped' : '';
  const upcoming = upcomingRace ? 'upcoming' : '';
  const dateTime = getDate(date, time);

  return (
    <ThemeConsumer>
      {theme =>
        <div className={`race unselectable ${striped} ${upcoming} ${theme}`}
        onClick={onClickRace(round)} onKeyPress={onEnterRace(round)}
        title='Show details' tabIndex='0'>
          <span className='round'>{round}.</span>
          <span className='location'>{country}, {locality}</span>
          <span className='date-time'>
            <span className='date'>{dateTime.toLocaleDateString()}</span>
            <span className='time'>{ time && dateTime.toLocaleTimeString() }</span>
          </span>
        </div>
      }
    </ThemeConsumer>
  );
}

export default Race;
