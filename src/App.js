import React, { Component, Fragment } from 'react';
import { fetchRaces, fetchRaceResults } from './api';
import * as deepmerge from 'deepmerge';
import RaceList from './components/RaceList';
import RaceDetails from './components/RaceDetails';
import SeasonSelect from './components/SeasonSelect';
import { FIRST_SEASON } from './constants';
import { saveRaces, loadRaces } from './localStorage';

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
      isLoadingResults: false,
      resultsError: null
    };
  }

  componentDidMount() {
    const races = loadRaces(this.state.season);
    if (races) {
      const newRaces = { [this.state.season]: races };
      this.setState({ races: { ...this.state.races, ...newRaces } });
    } else {
      this.getRaces(this.state.season);
    }
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

    this.setState({ isLoadingResults: true });
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
          isLoadingResults: false,
          resultsError: null
        });
      })
      .catch(error => {
         this.setState({ resultsError: error, isLoadingResults: false });
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
    const i = this.state.races[this.state.season].findIndex((race) => {
      return Number(race.round) === Number(raceRound);
    });
    this.setState({
      selectedRace: this.state.races[this.state.season][i],
      resultsError: null
    });
  }

  onSelectSeason = (e) => {
    this.setSeason(Number(e.target.value));
  }

  onChangeSeason = (change) => () => {
    const newSeason = Number(this.state.season) + change;
    if (newSeason >= FIRST_SEASON && newSeason <= new Date().getFullYear()) {
      this.setSeason(newSeason);
    }
  }

  setSeason = (season) => {
    this.setState({ season });
    if (!this.state.races[season]) {
      this.getRaces(season);
    }
  }

  onSaveRaces = () => {
    saveRaces(this.state.races[this.state.season], this.state.season);
  }

  render() {
    const {
      isLoading, error, selectedRace, season,
      results, isLoadingResults, resultsError
    } = this.state;
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
              isLoadingResults={isLoadingResults}
              resultsError={resultsError}
              onClickRace={this.onClickRace}
              getRaceResults={this.getRaceResults}
            />
          :
            <div className='container'>
              <SeasonSelect
                season={season}
                onSelectSeason={this.onSelectSeason}
                onChangeSeason={this.onChangeSeason}
              />
              <RaceList
                races={seasonRaces}
                upcomingRace={upcomingRace}
                isLoading={isLoading}
                error={error}
                onClickRace={this.onClickRace}
                onEnterRace={this.onEnterRace}
                onSaveRaces={this.onSaveRaces}
              />
            </div>
        }
      </Fragment>
    );
  }
}

export default App;
