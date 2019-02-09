import React, { Component, Fragment } from 'react';
import { fetchCurrentRaces, fetchNextRace } from './api';
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
    fetchCurrentRaces()
      .then(data => {
        this.setState({
          races: data.MRData.RaceTable.Races,
          isLoading: false
        });
        return data.MRData.RaceTable.Races;
      })
      .then(races => {
        const lastRace = races[races.length - 1];
        const lastRaceDate = new Date(lastRace.date + ' ' + lastRace.time);
        if (new Date() < lastRaceDate) {
          fetchNextRace()
            .then(data => {
              this.setState({ upcomingRace: data.MRData.RaceTable.round });
            });
        }
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false
        });
      });
  }

  onClickRace = (raceRound) => () => {
    this.selectRace(raceRound);
  }

  onEnterRace = (raceRound) => (e) => {
    if (e.key === 'Enter') {
      this.selectRace(raceRound);
    }
  }

  selectRace = (raceRound) => {
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
            <RaceDetails race={selectedRace} onClickRace={this.onClickRace} />
          :
            <RaceList
              races={races}
              upcomingRace={upcomingRace}
              onClickRace={this.onClickRace}
              onEnterRace={this.onEnterRace}
            />
        }
      </Fragment>
    );
  }
}

export default App;
