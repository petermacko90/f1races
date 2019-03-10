import React, { Component, Fragment } from 'react';
import { fetchRaces, fetchRaceResults } from './api';
import * as deepmerge from 'deepmerge';
import Header from './components/Header';
import RaceList from './components/RaceList';
import RaceDetails from './components/RaceDetails';
import Notifications from './components/Notifications';
import SeasonSelect from './components/SeasonSelect';
import Toast from './components/Toast';
import { ThemeProvider } from './ThemeContext';
import { FIRST_SEASON } from './constants';
import {
  saveRaces, loadRaces, saveNotifications, loadNotifications
} from './localStorage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      races: {},
      isLoading: false,
      error: null,
      season: new Date().getFullYear(),
      selectedRaceRound: 0,
      results: {},
      isLoadingResults: false,
      resultsError: null,
      notifications: [],
      isShowToast: false,
      toastText: '',
      route: 'RaceList',
      theme: 'ferrari'
    };
  }

  componentDidMount() {
    this.getRaces(this.state.season);
    const notifications = loadNotifications();
    if (notifications) {
      this.setState({ notifications });
    }
    this.interval = setInterval(this.checkNotifications, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  showToast = (text) => {
    this.setState({
      isShowToast: true,
      toastText: text
    });
    setTimeout(() => {
      this.setState({ isShowToast: false });
    }, 3000);
  }

  checkNotifications = () => {
    const { notifications } = this.state;
    const nowTime = Math.floor(new Date().getTime() / 1000 / 60);

    notifications.forEach(notification => {
      const notificationTime = Math.floor(notification.notificationDate.getTime() / 1000 / 60);
      if (notificationTime === nowTime && !notification.notified) {
        new Notification(notification.title, { body: notification.body });
        notification.notified = true;
        this.setState({ notifications });
        saveNotifications(notifications);
      } else if (notificationTime < nowTime && !notification.notified) {
        new Notification('Missed notification: ' + notification.title, {
          body: `At: ${notification.notificationDate.toLocaleDateString()} ${notification.notificationDate.toLocaleTimeString()}`
        });
        notification.notified = true;
        this.setState({ notifications });
        saveNotifications(notifications);
      }
    });
  }

  getRaces = (season) => {
    const races = loadRaces(season);
    if (races) {
      const newRaces = { [season]: races };
      this.setState((state) => {
        return { races: { ...state.races, ...newRaces } };
      });
    } else {
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
          if (season === new Date().getFullYear()) {
            saveRaces(data.MRData.RaceTable.Races, season);
          }
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
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
    this.setState({
      selectedRaceRound: Number(raceRound),
      route: 'RaceDetails',
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
    this.showToast('Calendar saved to browser storage');
  }

  addNotification = (raceName, raceDate, notificationWhen) => () => {
    if (!('Notification' in window)) {
      this.showToast('This browser does not support notifications :(');
      return;
    }

    if (raceDate < new Date()) {
      this.showToast('This race already started or is over');
      return;
    }

    let body = '';
    let notificationDate = new Date(raceDate);

    switch (notificationWhen) {
      case '1H':
        body = 'Starts in 1 Hour';
        notificationDate.setHours(notificationDate.getHours() - 1);
        break;
      default:
        body = 'Starts in 1 Hour';
        notificationDate.setHours(notificationDate.getHours() - 1);
    }

    const notification = {
      raceDate,
      notificationDate,
      notified: false,
      title: raceName,
      body
    };

    if (Notification.permission === 'granted') {
      this.setState(
        (state) => {
          return { notifications: state.notifications.concat(notification) };
        },
        () => {
          saveNotifications(this.state.notifications);
          this.showToast('Notification saved');
        }
      );
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.setState(
            (state) => {
              return { notifications: state.notifications.concat(notification) };
            },
            () => {
              saveNotifications(this.state.notifications);
              this.showToast('Notification saved');
            }
          );
        }
      });
    }
  }

  deleteNotification = (i) => () => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      const notifications = this.state.notifications;
      notifications.splice(i, 1);
      this.setState({ notifications });
      saveNotifications(notifications);
    }
  }

  setRoute = (route) => () => {
    this.setState({ route });
  }

  render() {
    const {
      races, isLoading, error, season, notifications, selectedRaceRound, route,
      results, isLoadingResults, resultsError, isShowToast, toastText
    } = this.state;
    const seasonRaces = this.state.races[season];

    let selectedRace = null;
    if (selectedRaceRound > 0 && races[season]) {
      const i = races[season].findIndex((race) => {
        return Number(race.round) === selectedRaceRound;
      });
      selectedRace = this.state.races[this.state.season][i];
    }

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
      <ThemeProvider value={this.state.theme}>
        <Fragment>
          <Header setRoute={this.setRoute} route={route} />
          <Toast show={isShowToast} text={toastText} />
          { route === 'Notifications' &&
            <Notifications
              notifications={notifications}
              deleteNotification={this.deleteNotification}
            />
          }
          { route === 'RaceDetails' &&
            <RaceDetails
              race={selectedRace}
              raceCount={seasonRaces.length}
              results={raceResults}
              isLoadingResults={isLoadingResults}
              resultsError={resultsError}
              onClickRace={this.onClickRace}
              getRaceResults={this.getRaceResults}
              addNotification={this.addNotification}
            />
          }
          { route === 'RaceList' &&
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
      </ThemeProvider>
    );
  }
}

export default App;
