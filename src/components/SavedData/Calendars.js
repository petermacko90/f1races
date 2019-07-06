import React, { useState, useEffect } from 'react';
import './Calendars.css';
import { getCalendars, removeCalendar } from '../../localStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

export default function Calendars() {
  const [ calendars, setCalendars ] = useState([]);

  useEffect(() => {
    setCalendars(getCalendars);
  }, []);

  function deleteCalendar(calendar) {
    const filteredCalendars = calendars.filter(c => c !== calendar);
    const error = removeCalendar(calendar);
    if (error) {
      toast.error('Error - calendar was not deleted :(');
    } else {
      setCalendars(filteredCalendars);
    }
  }

  return (
    <>
      <h2 className="ml3 mr3">Saved Calendars</h2>
      {calendars.length === 0
        ? <p className="p3">No saved calendars</p>
        :
          <ul className="ml3 mr3">
            {calendars.map(calendar => (
              <li key={calendar}>
                <button
                  className="button bg-ferrari b-ferrari mr3 mb3"
                  title="Delete Calendar"
                  onClick={() => deleteCalendar(calendar)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <span>{calendar.slice(-4)}</span>
              </li>
            ))}
          </ul>
      }
    </>
  );
}
