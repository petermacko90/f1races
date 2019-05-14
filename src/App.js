import React, { Component, Fragment } from 'react';
import {
  fetchRaces, fetchRaceResults, fetchDriverStandings, fetchConstructorStandings
} from './api';
import * as deepmerge from 'deepmerge';
import Header from './components/Header';
import Navigation from './components/Navigation/Navigation';
import RaceList from './components/RaceList/RaceList';
import Standings from './components/Standings/Standings';
import RaceDetails from './components/RaceDetails/RaceDetails';
import Notifications from './components/SavedData/Notifications';
import Calendars from './components/SavedData/Calendars';
import SeasonSelect from './components/SeasonSelect';
import Footer from './components/Footer';
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
      theme: '',
      driverStandings: {},
      isLoadingDrivers: false,
      errorDrivers: null,
      constructorStandings: {},
      isLoadingConstructors: false,
      errorConstructors: null
    };
  }

  componentDidMount() {
    this.getRaces(this.state.season);
    const notifications = loadNotifications();
    if (notifications) {
      this.setState(
        { notifications },
        () => this.checkNotifications()
      );
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
      const { notificationDate, raceDate, title, body } = notification;
      const notificationTime = Math.floor(notificationDate.getTime() / 1000 / 60);

      const showNotification = (title, body) => {
        new Notification(title, { body: body });
        notification.notified = true;
        this.deleteNotification(notification.id);
      }

      if (notificationTime === nowTime && !notification.notified) {
        showNotification(title, body);
      } else if (notificationTime < nowTime && !notification.notified) {
        showNotification(
          'Missed notification: ' + title,
          `Notification time: ${notificationDate.toLocaleDateString()} ${notificationDate.toLocaleTimeString()}
Race time: ${raceDate.toLocaleDateString()} ${raceDate.toLocaleTimeString()}`
        );
      } else if (notification.notified) {
        this.deleteNotification(notification.id);
      }
    });
  }

  getRaces = (season) => {
    const races = loadRaces(season);
    if (races) {
      const newRaces = { [season]: races };
      this.setState(prevState => {
        return { races: { ...prevState.races, ...newRaces } };
      });
    } else {
      if (!navigator.onLine) {
        toast.error('You are offline :(');
        return;
      }

      this.setState({ isLoading: true });
      fetchRaces(season)
        .then(data => {
          if (data.MRData.RaceTable.Races.length === 0) {
            throw Error('No data available');
          }

          const newRaces = { [season]: data.MRData.RaceTable.Races };
          this.setState(prevState => {
            return {
              races: { ...prevState.races, ...newRaces },
              isLoading: false
            };
          });

          if (season === CURRENT_SEASON) {
            saveRaces(data.MRData.RaceTable.Races, season);
          }
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  getRaceResults = (season, round) => () => {
    if (!navigator.onLine) {
      toast.error('You are offline :(');
      return;
    }

    this.setState({ isLoadingResults: true });
    fetchRaceResults(season, round)
      .then(data => {
        if (data.MRData.RaceTable.Races.length === 0) {
          throw Error('No data available');
        }

        let newResults = {
          [season]: {
            [round]: data.MRData.RaceTable.Races[0].Results
          }
        };

        this.setState(prevState => {
          return {
            results: deepmerge(prevState.results, newResults),
            isLoadingResults: false,
            resultsError: null
          };
        });
      })
      .catch(error => {
        this.setState({ resultsError: error, isLoadingResults: false });
      });
  }

  getDriverStandings = (season) => {
    if (!navigator.onLine) {
      toast.error('You are offline :(');
      return;
    }

    this.setState({ isLoadingDrivers: true });
    fetchDriverStandings(season)
      .then(data => {
        this.setState(prevState => {
          const newStandings = {
            [season]: data.MRData.StandingsTable.StandingsLists[0].DriverStandings
          };
          return {
            driverStandings: { ...prevState.driverStandings, ...newStandings },
            isLoadingDrivers: false
          };
        });
      })
      .catch(error => {
        this.setState({ isLoadingDrivers: false, errorDrivers: error });
      });
  }

  getConstructorStandings = (season) => {
    if (!navigator.onLine) {
      return;
    }

    this.setState({ isLoadingConstructors: true });
    fetchConstructorStandings(season)
      .then(data => {
        this.setState(prevState => {
          const newStandings = {
            [season]: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
          };
          return {
            constructorStandings: {
              ...prevState.constructorStandings, ...newStandings
            },
            isLoadingConstructors: false
          };
        });
      })
      .catch(error => {
        this.setState({
          isLoadingConstructors: false,
          errorConstructors: error
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
    const { route, races, driverStandings } = this.state;
    this.setState({
      season,
      error: null
    });
    if (!races[season] && route === 'RaceList') {
      this.getRaces(season);
    }
    if (!driverStandings[season] && route === 'Standings') {
      this.getDriverStandings(season);
      this.getConstructorStandings(season);
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

    const id = notificationDate.getTime();
    for (let i = 0, l = this.state.notifications.length; i < l; i++) {
      if (this.state.notifications[i].id === id) {
        toast.error('Notification already exists');
        return;
      }
    }

    const createNotification = () => {
      let body = 'Race Starts in ';
      body += notificationOptions[notificationWhen] ? notificationOptions[notificationWhen] : notificationOptions['60'];

      const notification = {
        id,
        raceDate,
        notificationDate,
        notified: false,
        title: raceName,
        body
      };

      const error = saveNotifications(this.state.notifications.concat(notification));
      if (error) {
        toast.error('Error - notification was not saved :(');
      } else {
        toast.success('Notification saved to browser storage');
        this.setState(state => {
          return { notifications: state.notifications.concat(notification) };
        }, () => this.checkNotifications());
      }
    }

    if (Notification.permission === 'granted') {
      createNotification();
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          createNotification();
        }
      });
    }
  }

  deleteNotification = (id) => {
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

  setNotificationWhen = (e) => {
    this.setState({ notificationWhen: e.target.value });
  }

  setRoute = (route) => () => {
    this.setState({ route });
    if (route === 'RaceList' || route === 'Standings') {
      this.setState({ season: CURRENT_SEASON });
    }
  }

  render() {
    const {
      races, isLoading, error, season, notifications, selectedRaceRound, route,
      results, isLoadingResults, resultsError, notificationWhen, theme,
      driverStandings, isLoadingDrivers, errorDrivers,
      constructorStandings, isLoadingConstructors, errorConstructors
    } = this.state;
    const seasonRaces = races[season];

    let selectedRace = null;
    if (selectedRaceRound > 0 && races[season]) {
      const i = races[season].findIndex((race) => {
        return Number(race.round) === selectedRaceRound;
      });
      selectedRace = races[season][i];
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

    const seasonSelect = (
      <SeasonSelect
        season={season}
        onSelectSeason={this.onSelectSeason}
        onChangeSeason={this.onChangeSeason}
      />
    );

    return (
      <ThemeProvider value={theme}>
        <Fragment>
          <Header setTheme={this.setTheme} />
          <Navigation setRoute={this.setRoute} route={route} />
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
            <RaceList
              races={seasonRaces}
              upcomingRace={upcomingRace}
              isLoading={isLoading}
              error={error}
              onClickRace={this.onClickRace}
              onEnterRace={this.onEnterRace}
              onSaveRaces={this.onSaveRaces}
              seasonSelect={seasonSelect}
            />
          }
          { route === 'Standings' &&
            <Standings
              season={season}
              driverStandings={driverStandings}
              isLoadingDrivers={isLoadingDrivers}
              errorDrivers={errorDrivers}
              getDriverStandings={this.getDriverStandings}
              constructorStandings={constructorStandings}
              isLoadingConstructors={isLoadingConstructors}
              errorConstructors={errorConstructors}
              getConstructorStandings={this.getConstructorStandings}
              seasonSelect={seasonSelect}
            />
          }
          <Footer />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
