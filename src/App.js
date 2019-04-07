import React, { Component, Fragment } from 'react';
import { fetchRaces, fetchRaceResults } from './api';
import * as deepmerge from 'deepmerge';
import Header from './components/Header';
import RaceList from './components/RaceList';
import RaceDetails from './components/RaceDetails';
import Notifications from './components/Notifications';
import Calendars from './components/Calendars';
import SeasonSelect from './components/SeasonSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ThemeProvider } from './ThemeContext';
import {
  FIRST_SEASON, CURRENT_SEASON, notificationOptions
} from './constants';
import {
  saveRaces, loadRaces, saveNotifications, loadNotifications,
  saveTheme, loadTheme
} from './localStorage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      races: {},
      isLoading: false,
      error: null,
      season: CURRENT_SEASON,
      selectedRaceRound: 0,
      results: {},
      isLoadingResults: false,
      resultsError: null,
      notifications: [],
      notificationWhen: '60',
      route: 'RaceList',
      theme: ''
    };
  }

  componentDidMount() {
    this.getRaces(this.state.season);
    const notifications = loadNotifications();
    if (notifications) {
      this.setState({ notifications });
    }
    const theme = loadTheme();
    this.setState({ theme });
    this.interval = setInterval(this.checkNotifications, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setTheme = (e) => {
    this.setState({ theme: e.target.value });
    saveTheme(e.target.value);
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
          if (season === CURRENT_SEASON) {
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
    if (newSeason >= FIRST_SEASON && newSeason <= CURRENT_SEASON) {
      this.setSeason(newSeason);
    }
  }

  setSeason = (season) => {
    this.setState({
      season,
      error: null
    });
    if (!this.state.races[season]) {
      this.getRaces(season);
    }
  }

  onSaveRaces = () => {
    const error = saveRaces(this.state.races[this.state.season], this.state.season);
    if (error) {
      toast.error('Error - calendar was not saved :(');
    } else {
      toast.success('Calendar saved to browser storage');
    }
  }

  addNotification = (raceName, raceDate, notificationWhen) => () => {
    if (!('Notification' in window)) {
      toast.error('This browser does not support notifications :(');
      return;
    }

    if (raceDate < new Date()) {
      toast.error('This race already started or is over');
      return;
    }

    let notificationDate = new Date(raceDate);
    notificationDate.setMinutes(notificationDate.getMinutes() - (Number(notificationWhen) ? notificationWhen : 60));

    let body = 'Race Starts in ';
    body += notificationOptions[notificationWhen] ? notificationOptions[notificationWhen] : notificationOptions['60'];

    const id = notificationDate.getTime();
    for (let i = 0, l = this.state.notifications.length; i < l; i++) {
      if (this.state.notifications[i].id === id) {
        toast.error('Notification already exists');
        return;
      }
    }

    const notification = {
      id,
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
          const error = saveNotifications(this.state.notifications);
          if (error) {
            toast.error('Error - notification was not saved :(');
          } else {
            toast.success('Notification saved to browser storage');
          }
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
              const error = saveNotifications(this.state.notifications);
              if (error) {
                toast.error('Error - notification was not saved :(');
              } else {
                toast.success('Notification saved to browser storage');
              }
            }
          );
        }
      });
    }
  }

  deleteNotification = (id) => () => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      const notifications = this.state.notifications.filter(notification => {
        return notification.id !== id;
      });
      const error = saveNotifications(notifications);
      if (error) {
        toast.error('Error - Unable to delete notification :(');
      } else {
        this.setState({ notifications });
      }
    }
  }

  setNotificationWhen = (e) => {
    this.setState({ notificationWhen: e.target.value });
  }

  setRoute = (route) => () => {
    this.setState({ route });
  }

  render() {
    const {
      races, isLoading, error, season, notifications, selectedRaceRound, route,
      results, isLoadingResults, resultsError, notificationWhen
    } = this.state;
    const seasonRaces = this.state.races[season];

    let selectedRace = null;
    if (selectedRaceRound > 0 && races[season]) {
      const i = races[season].findIndex((race) => {
        return Number(race.round) === selectedRaceRound;
      });
      selectedRace = this.state.races[this.state.season][i];
    }

    let upcomingRace = '';
    if (seasonRaces && season === CURRENT_SEASON) {
      for (let i = 0, l = seasonRaces.length, d = new Date(); i < l; i++) {
        if (d < new Date(seasonRaces[i].date + 'T' + seasonRaces[i].time)) {
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
          <Header
            setRoute={this.setRoute}
            route={route}
            setTheme={this.setTheme}
          />
          <ToastContainer
            position='bottom-center'
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnVisibilityChange
            draggable={false}
            pauseOnHover
          />
          { route === 'Notifications' &&
            <Notifications
              notifications={notifications}
              deleteNotification={this.deleteNotification}
            />
          }
          { route === 'Calendars' && <Calendars /> }
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
              notificationWhen={notificationWhen}
              setNotificationWhen={this.setNotificationWhen}
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
