import React, { Component, Fragment } from 'react';
import { fetchRaces, fetchRaceResults } from './api';
import * as deepmerge from 'deepmerge';
import RaceList from './components/RaceList';
import RaceDetails from './components/RaceDetails';

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
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  getRaceResults = (season, round) => () => {
    const { results } = this.state;

    fetchRaceResults(season, round)
      .then(data => {
        if (data.MRData.RaceTable.Races.length === 0) {
          throw Error('No data available');
        }

        let res = {
          [season]: {
            [round]: data.MRData.RaceTable.Races[0].Results
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
    this.setState({
      selectedRace: this.state.races[i],
      resultsError: null
    });
  }

  render() {
    const {
      races, isLoading, error, upcomingRace, selectedRace,
      results, resultsError
    } = this.state;
    let raceResults;

    if (selectedRace && results[selectedRace.season]) {
      raceResults = results[selectedRace.season][selectedRace.round];
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
