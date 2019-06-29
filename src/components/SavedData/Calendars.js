import React, { Component } from 'react';
import './Calendars.css';
import { getCalendars } from '../../localStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class Calendars extends Component {
  constructor() {
    super();
    this.state = {
      calendars: []
    };
  }

  componentDidMount() {
    const calendars = getCalendars();
    this.setState({ calendars });
  }

  deleteCalendar = (calendar) => () => {
    const calendars = this.state.calendars.filter(c => c !== calendar);
    this.setState({ calendars });
    localStorage.removeItem(calendar);
  }

  render() {
    const sortedCalendars = this.state.calendars.slice().sort((a, b) => {
      return a.slice(-4) - b.slice(-4);
    });

    return (
      <div className='container'>
        <h2 className='ml3 mr3'>Saved Calendars</h2>
        {
          this.state.calendars.length === 0 ?
            <p className='p3'>No saved calendars</p>
          :
            <ul className='ml3 mr3'>
              {
                sortedCalendars.map(calendar => {
                  return (
                    <li key={calendar}>
                      <button
                        className='button bg-ferrari b-ferrari mr3 mb3'
                        title='Delete Calendar'
                        onClick={this.deleteCalendar(calendar)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                      <span>{calendar.slice(-4)}</span>
                    </li>
                  );
                })
              }
            </ul>
        }
      </div>
    );
  }
}

export default Calendars;
