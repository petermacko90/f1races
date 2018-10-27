import React, { Component, Fragment } from 'react';
import RaceList from './components/RaceList';
import RaceDetails from './components/RaceDetails';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      races: [],
      upcomingRace: '',
      selectedRace: null,
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

  onSelectRace = (raceRound) => (e) => {
    const i = this.state.races.findIndex((race) => {
      return Number(race.round) === Number(raceRound);
    });
    this.setState({ selectedRace: this.state.races[i] });
  }

  render() {
    const { races, upcomingRace, selectedRace, isLoading, error } = this.state;

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
        {
          selectedRace ?
            <RaceDetails race={selectedRace} selectRace={this.onSelectRace} />
          :
            <RaceList
              races={races}
              upcomingRace={upcomingRace}
              selectRace={this.onSelectRace}
            />
        }
      </Fragment>
    );
  }
}

export default App;
