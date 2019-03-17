import React, { Component } from 'react';
import { getCalendars } from '../localStorage';

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
    return (
      <div className='container'>
        <h2 className='ml10 mr10'>Saved Calendars</h2>
        {
          this.state.calendars.length === 0 ?
            <p className='p10'>No saved calendars</p>
          :
            <ul className='ml10 mr10'>
              {
                this.state.calendars.map(calendar => {
                  return (
                    <li key={calendar}>
                      <button className='button mr10 mb10' title='Delete Calendar'
                      onClick={this.deleteCalendar(calendar)}>
                        &times;
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
