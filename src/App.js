import React, { Component, Fragment } from 'react';
import { fetchRaces, fetchRaceResults } from './api';
import * as deepmerge from 'deepmerge';
import RaceList from './components/RaceList';
import RaceDetails from './components/RaceDetails';

class App extends Component {
  constructor() {
    super();
    this.state = {
      races: {},
      isLoading: false,
      error: null,
      season: new Date().getFullYear(),
      selectedRace: null,
      results: {},
      resultsError: null
    };
  }

  componentDidMount() {
    this.getRaces(this.state.season);
  }

  getRaces = (season) => {
    this.setState({ isLoading: true });
    fetchRaces(season)
      .then(data => {
        if (data.MRData.RaceTable.Races.length === 0) {
          throw Error('No data available');
        }

        const newRaces = { [season]: data.MRData.RaceTable.Races };
        this.setState({
          races: { ...this.state.races, ...newRaces },
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

  onSelectSeason = (e) => {
    this.setSeason(e.target.value);
  }

  setSeason = (season) => {
    this.setState({ season });
    if (!this.state.races[season]) {
      this.getRaces(season);
    }
  }

  render() {
    const {
      isLoading, error, selectedRace, results, resultsError
    } = this.state;
    const season = Number(this.state.season);
    const seasonRaces = this.state.races[season];

    const dateNow = new Date();
    let upcomingRace = '';
    if (seasonRaces && season === dateNow.getFullYear()) {
      for (let i = 0, l = seasonRaces.length; i < l; i++) {
        if (dateNow < new Date(seasonRaces[i].date + ' ' + seasonRaces[i].time)) {
          upcomingRace = seasonRaces[i].round;
          break;
        }
      }
    }

    let raceResults;
    if (selectedRace && results[selectedRace.season]) {
      raceResults = results[selectedRace.season][selectedRace.round];
    }

    return (
      <Fragment>
        <header>
          <h1>F1 Races</h1>
        </header>
        {
          selectedRace ?
            <RaceDetails
              race={selectedRace}
              raceCount={seasonRaces.length}
              results={raceResults}
              resultsError={resultsError}
              onClickRace={this.onClickRace}
              getRaceResults={this.getRaceResults}
            />
          :
            <RaceList
              races={seasonRaces}
              upcomingRace={upcomingRace}
              isLoading={isLoading}
              error={error}
              season={season}
              onSelectSeason={this.onSelectSeason}
              onClickRace={this.onClickRace}
              onEnterRace={this.onEnterRace}
            />
        }
      </Fragment>
    );
  }
}

export default App;
