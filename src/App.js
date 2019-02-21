import React, { Component, Fragment } from 'react';
import { fetchRaces, fetchNextRace, fetchRaceResults } from './api';
import * as deepmerge from 'deepmerge';
import RaceList from './components/RaceList';
import RaceDetails from './components/RaceDetails';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      races: [],
      isLoading: false,
      error: null,
      season: new Date().getFullYear(),
      upcomingRace: '',
      selectedRace: null,
      results: {},
      resultsError: null
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetchRaces(this.state.season)
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
          fetchNextRace(this.state.season)
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

  getRaceResults = (season, round) => () => {
    const { results } = this.state;

    fetchRaceResults(season, round)
      .then(data => {
        if (data.MRData.RaceTable.Races.length === 0) {
          throw Error('No data available');
        }

        let res = {
          ['s' + season]: {
            ['r' + round]: data.MRData.RaceTable.Races[0].Results
          }
        };

        this.setState({
          results: deepmerge(results, res),
          resultsError: null
        });
      })
      .catch(err => this.setState({ resultsError: err }));
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
    const {
      races, isLoading, error, upcomingRace, selectedRace,
      results, resultsError
    } = this.state;
    let raceResults;

    if (selectedRace && results['s' + selectedRace.season]) {
      raceResults = results['s' + selectedRace.season]['r' + selectedRace.round];
    }

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
            <RaceDetails
              race={selectedRace}
              raceCount={races.length}
              results={raceResults}
              resultsError={resultsError}
              onClickRace={this.onClickRace}
              getRaceResults={this.getRaceResults}
            />
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
