import React, { Component } from 'react';
import {
  fetchRaces, fetchRaceResults, fetchDriverStandings, fetchConstructorStandings
} from './api';
import deepmerge from 'deepmerge';
import Header from './components/Header';
import Navigation from './components/Navigation/Navigation';
import RaceList from './components/RaceList/RaceList';
import Standings from './components/Standings/Standings';
import RaceDetails from './components/RaceDetails/RaceDetails';
import Notifications from './components/SavedData/Notifications';
import SavedData from './components/SavedData/SavedData';
import SeasonSelect from './components/SeasonSelect';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ThemeProvider } from './ThemeContext';
import {
  FIRST_SEASON, CURRENT_SEASON, NOTIFICATION_OPTIONS
} from './constants';
import {
  saveRaces, loadRaces, saveNotifications, loadNotifications,
  saveTheme, loadTheme
} from './localStorage';
import { getDate } from './helpers';

export default class App extends Component {
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
    this.addNotification = this.addNotification.bind(this);
    this.checkNotifications = this.checkNotifications.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
    this.getConstructorStandings = this.getConstructorStandings.bind(this);
    this.getDriverStandings = this.getDriverStandings.bind(this);
    this.getRaceResults = this.getRaceResults.bind(this);
    this.onChangeSeason = this.onChangeSeason.bind(this);
    this.onSaveRaces = this.onSaveRaces.bind(this);
    this.selectRace = this.selectRace.bind(this);
    this.setNotificationWhen = this.setNotificationWhen.bind(this);
    this.setRoute = this.setRoute.bind(this);
    this.setTheme = this.setTheme.bind(this);
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
    this.setState({ theme: loadTheme() });
    this.interval = setInterval(this.checkNotifications, 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setTheme(theme) {
    this.setState({ theme });
    saveTheme(theme);
  }

  checkNotifications() {
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

  getRaces(season) {
    const races = loadRaces(season);
    if (races) {
      const newRaces = { [season]: races };
      this.setState(prevState => {
        return { races: { ...prevState.races, ...newRaces } };
      });
    } else {
      if (!navigator.onLine) {
        toast.error('You are offline :(');
        this.setState({ error: new Error('No data available') });
        return;
      }

      this.setState({ isLoading: true });
      fetchRaces(season)
        .then(races => {
          const newRaces = { [season]: races };
          this.setState(prevState => {
            return {
              races: { ...prevState.races, ...newRaces }
            };
          });

          if (season === CURRENT_SEASON) {
            saveRaces(races, season);
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  getRaceResults(season, round) {
    if (!navigator.onLine) {
      toast.error('You are offline :(');
      return;
    }

    this.setState({ isLoadingResults: true });
    fetchRaceResults(season, round)
      .then(results => {
        let newResults = {
          [season]: {
            [round]: results
          }
        };

        this.setState(prevState => {
          return {
            results: deepmerge(prevState.results, newResults),
            resultsError: null
          };
        });
      })
      .catch(resultsError => this.setState({ resultsError }))
      .finally(() => this.setState({ isLoadingResults: false }));
  }

  getDriverStandings(season) {
    if (!navigator.onLine) {
      toast.error('You are offline :(');
      return;
    }

    this.setState({ isLoadingDrivers: true });
    fetchDriverStandings(season)
      .then(standings => {
        this.setState(prevState => {
          const newStandings = { [season]: standings };
          return {
            driverStandings: { ...prevState.driverStandings, ...newStandings }
          };
        });
      })
      .catch(errorDrivers => this.setState({ errorDrivers }))
      .finally(() => this.setState({ isLoadingDrivers: false }));
  }

  getConstructorStandings(season) {
    if (!navigator.onLine) {
      return;
    }

    this.setState({ isLoadingConstructors: true });
    fetchConstructorStandings(season)
      .then(standings => {
        this.setState(prevState => {
          const newStandings = { [season]: standings };
          return {
            constructorStandings: {
              ...prevState.constructorStandings, ...newStandings
            }
          };
        });
      })
      .catch(errorConstructors => this.setState({ errorConstructors }))
      .finally(() => this.setState({ isLoadingConstructors: false }));
  }

  selectRace(raceRound) {
    this.setState({
      selectedRaceRound: Number(raceRound),
      route: 'RaceDetails',
      resultsError: null
    });
  }

  onChangeSeason(season) {
    const { route, races } = this.state;
    if (season >= FIRST_SEASON && season <= CURRENT_SEASON) {
      this.setState({
        season,
        error: null
      });
      if (!races[season] && route === 'RaceList') {
        this.getRaces(season);
      }
    }
  }

  onSaveRaces() {
    const error = saveRaces(this.state.races[this.state.season], this.state.season);
    if (error) {
      toast.error('Error - calendar was not saved :(');
    } else {
      toast.success('Calendar saved to browser storage');
    }
  }

  addNotification(raceName, raceDate, notificationWhen) {
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
      body += NOTIFICATION_OPTIONS[notificationWhen]
        ? NOTIFICATION_OPTIONS[notificationWhen]
        : NOTIFICATION_OPTIONS['60'];

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

  deleteNotification(id) {
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

  setNotificationWhen(notificationWhen) {
    this.setState({ notificationWhen });
  }

  setRoute(route) {
    this.setState({ route });
    if (route === 'RaceList') {
      this.setState({ error: null });
    }
  }

  getSelectedRace(selectedRaceRound, races) {
    if (selectedRaceRound > 0 && races) {
      const i = races.findIndex(r => Number(r.round) === selectedRaceRound);
      return races[i];
    }
    return null;
  }

  getUpcomingRace(races, season, currentSeason) {
    if (races && season === currentSeason) {
      for (let i = 0, l = races.length, d = new Date(); i < l; i++) {
        if (d < getDate(races[i].date, races[i].time)) {
          return races[i].round;
        }
      }
    }
    return '';
  }

  getResults(selectedRace, results) {
    if (selectedRace && results) {
      return results[selectedRace.round];
    }
    return null;
  }

  render() {
    const {
      races, isLoading, error, season, notifications, selectedRaceRound, route,
      results, isLoadingResults, resultsError, notificationWhen, theme,
      driverStandings, isLoadingDrivers, errorDrivers,
      constructorStandings, isLoadingConstructors, errorConstructors
    } = this.state;
    const seasonRaces = races[season];
    const selectedRace = this.getSelectedRace(selectedRaceRound, seasonRaces);

    const seasonSelect = (
      <SeasonSelect
        season={season}
        onChangeSeason={this.onChangeSeason}
      />
    );

    const savedNotifications = (
      <Notifications
        notifications={notifications}
        deleteNotification={this.deleteNotification}
      />
    );

    return (
      <ThemeProvider value={theme}>
        <Header setTheme={this.setTheme} />
        <Navigation setRoute={this.setRoute} route={route} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover
        />
        {route === 'SavedData' && (
          <SavedData savedNotifications={savedNotifications} />
        )}
        {route === 'RaceDetails' && (
          <RaceDetails
            race={selectedRace}
            raceCount={seasonRaces.length}
            results={this.getResults(selectedRace, results[selectedRace.season])}
            isLoadingResults={isLoadingResults}
            resultsError={resultsError}
            selectRace={this.selectRace}
            getRaceResults={this.getRaceResults}
            addNotification={this.addNotification}
            notificationWhen={notificationWhen}
            setNotificationWhen={this.setNotificationWhen}
          />
        )}
        {route === 'RaceList' && (
          <RaceList
            races={seasonRaces}
            upcomingRace={this.getUpcomingRace(seasonRaces, season, CURRENT_SEASON)}
            isLoading={isLoading}
            error={error}
            selectRace={this.selectRace}
            onSaveRaces={this.onSaveRaces}
            seasonSelect={seasonSelect}
          />
        )}
        {route === 'Standings' && (
          <Standings
            driverStandings={driverStandings}
            isLoadingDrivers={isLoadingDrivers}
            errorDrivers={errorDrivers}
            getDriverStandings={this.getDriverStandings}
            constructorStandings={constructorStandings}
            isLoadingConstructors={isLoadingConstructors}
            errorConstructors={errorConstructors}
            getConstructorStandings={this.getConstructorStandings}
          />
        )}
        <Footer />
      </ThemeProvider>
    );
  }
}
