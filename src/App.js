import React, { Component, Fragment } from 'react';
import RaceList from './components/RaceList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      races: [],
      upcomingRace: '',
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('https://ergast.com/api/f1/current.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          races: data.MRData.RaceTable.Races,
          isLoading: false
        });
      })
      .then(
        fetch('https://ergast.com/api/f1/current/next.json')
          .then(response => response.json())
          .then(data => {
            this.setState({ upcomingRace: data.MRData.RaceTable.round });
          })
      )
      .catch(error => {
        this.setState({
          error,
          isLoading: false
        });
      });
  }

  render() {
    const { races, upcomingRace, isLoading, error } = this.state;

    return (
      <Fragment>
        <header>
          <h1>F1 Races</h1>
        </header>
        { isLoading && <p className='message'>Loading...</p> }
        {
          error &&
            <p className='message'>An error occured while retrieving data.</p>
        }
        <RaceList races={races} upcomingRace={upcomingRace} />
      </Fragment>
    );
  }
}

export default App;
