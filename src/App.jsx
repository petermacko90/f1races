import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { ThemeProvider } from './ThemeContext';
import {
  fetchRaces, fetchRaceResults, fetchDriverStandings, fetchConstructorStandings
} from './api';
import { saveTheme, loadTheme, loadRaces, saveRaces } from './localStorage';
import {
  calendarInitialState, calendarReducer,
  resultsInitialState, resultsReducer,
  driversInitialState, driversReducer,
  constructorsReducer, constructorsInitialState
} from './reducers';
import { getDate } from './helpers';
import Header from './components/Header';
import Navigation from './components/Navigation/Navigation';
import RaceList from './components/RaceList/RaceList';
import RaceDetails from './components/RaceDetails/RaceDetails';
import Standings from './components/Standings/Standings';
import SeasonSelect from './components/SeasonSelect';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { CURRENT_SEASON } from './constants';

export default function App() {
  const [theme, setTheme] = useState('');
  useEffect(() => {
    setTheme(loadTheme());
  }, []);

  const [route, setRoute] = useState('RaceList');

  const [calendarSeason, setCalendarSeason] = useState(CURRENT_SEASON);
  const [calendarState, calendarDispatch] = useReducer(calendarReducer, calendarInitialState);
  const [isSavedCalendarInit, setIsSavedCalendarInit] = useState(false);
  useEffect(() => {
    const getRaces = async () => {
      const races = loadRaces(calendarSeason);
      if (races) {
        calendarDispatch({
          type: 'FETCH_SUCCESS',
          payload: { season: calendarSeason, races }
        });
      } else {
        if (!navigator.onLine) {
          if (!toast.isActive(1)) {
            toast.error('You are offline :(', { toastId: 1 });
          }
          calendarDispatch({
            type: 'FETCH_ERROR',
            payload: new Error('No data available')
          });
          return;
        }

        calendarDispatch({ type: 'FETCH_INIT' });
        try {
          const races = await fetchRaces(calendarSeason);
          calendarDispatch({
            type: 'FETCH_SUCCESS',
            payload: { season: calendarSeason, races }
          });

          if (calendarSeason === CURRENT_SEASON) {
            const error = saveRaces(races, calendarSeason);
            if (!error) setIsSavedCalendarInit(true);
          }
        } catch (error) {
          calendarDispatch({ type: 'FETCH_ERROR', payload: error });
        }
      }
    };

    if (!calendarState.races[calendarSeason]) getRaces();
  }, [calendarSeason, calendarState.races]);

  const [selectedRaceRound, setSelectedRaceRound] = useState(0);

  const [resultsState, resultsDispatch] = useReducer(resultsReducer, resultsInitialState);

  const [standingsSeason, setStandingsSeason] = useState(CURRENT_SEASON);
  const [driversState, driversDispatch] = useReducer(driversReducer, driversInitialState);
  const [constructorsState, constructorsDispatch] = useReducer(constructorsReducer, constructorsInitialState);

  async function getRaceResults(season, round) {
    if (!navigator.onLine) {
      if (!toast.isActive(1)) {
        toast.error('You are offline :(', { toastId: 1 });
      }
      return;
    }

    resultsDispatch({ type: 'FETCH_INIT' });
    try {
      const results = await fetchRaceResults(season, round);
      resultsDispatch({
        type: 'FETCH_SUCCESS',
        payload: { season, round, results }
      });
    } catch(error) {
      resultsDispatch({ type: 'FETCH_ERROR', payload: error });
    }
  }

  const getDriverStandings = useCallback(() => {
    if (!navigator.onLine) {
      if (!toast.isActive(1)) {
        toast.error('You are offline :(', { toastId: 1 });
      }
      return;
    }

    driversDispatch({ type: 'FETCH_INIT' });
    fetchDriverStandings(standingsSeason)
      .then(standings => {
        driversDispatch({
          type: 'FETCH_SUCCESS',
          payload: { season: standingsSeason, standings }
        });
      })
      .catch(error => {
        driversDispatch({ type: 'FETCH_ERROR', payload: error });
      });
  }, [standingsSeason]);

  const getConstructorStandings = useCallback(() => {
    if (!navigator.onLine) {
      if (!toast.isActive(1)) {
        toast.error('You are offline :(', { toastId: 1 });
      }
      return;
    }

    constructorsDispatch({ type: 'FETCH_INIT' });
    fetchConstructorStandings(standingsSeason)
      .then(standings => {
        constructorsDispatch({
          type: 'FETCH_SUCCESS',
          payload: { season: standingsSeason, standings }
        });
      })
      .catch(error => {
        constructorsDispatch({ type: 'FETCH_ERROR', payload: error });
      });
  }, [standingsSeason]);

  function setAndSaveTheme(theme) {
    setTheme(theme);
    saveTheme(theme);
  }

  function getUpcomingRace(races, season, currentSeason) {
    if (races && season === currentSeason) {
      for (let i = 0, l = races.length, d = new Date(); i < l; i++) {
        if (d < getDate(races[i].date, races[i].time)) {
          return races[i].round;
        }
      }
    }
    return '';
  }

  function selectRace(raceRound) {
    setRoute('RaceDetails');
    setSelectedRaceRound(Number(raceRound));
    resultsDispatch({ type: 'CLEAR_ERROR' });
  }

  function onChangeCalendarSeason(season) {
    setCalendarSeason(season);
    calendarDispatch({ type: 'CLEAR_ERROR' });
  }

  function onSaveRaces() {
    const error = saveRaces(calendarState.races[calendarSeason], calendarSeason);
    if (error) {
      toast.error('Error - calendar was not saved :(');
      return false;
    } else {
      toast.success('Calendar saved to browser storage');
      return true;
    }
  }

  function getSelectedRace(selectedRaceRound, races) {
    if (selectedRaceRound > 0 && races) {
      const i = races.findIndex(r => Number(r.round) === selectedRaceRound);
      return races[i];
    }
    return null;
  }

  function getResults(selectedRace, results) {
    if (selectedRace && results) {
      return results[selectedRace.round];
    }
    return null;
  }

  const seasonRaces = calendarState.races[calendarSeason];
  const selectedRace = getSelectedRace(selectedRaceRound, calendarState.races[calendarSeason]);

  return (
    <ThemeProvider value={theme}>
      <Header setTheme={setAndSaveTheme} />
      <Navigation route={route} setRoute={setRoute} />
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
      {route === 'RaceList' && (
        <RaceList
          races={seasonRaces}
          season={calendarSeason}
          isSavedCalendarInit={isSavedCalendarInit}
          upcomingRace={getUpcomingRace(seasonRaces, calendarSeason, CURRENT_SEASON)}
          isLoading={calendarState.isLoading}
          error={calendarState.error}
          selectRace={selectRace}
          onSaveRaces={onSaveRaces}
          seasonSelect={
            <SeasonSelect
              season={calendarSeason}
              onChangeSeason={onChangeCalendarSeason}
            />
          }
        />
      )}
      {route === 'RaceDetails' && (
        <RaceDetails
          race={selectedRace}
          raceCount={seasonRaces.length}
          results={getResults(selectedRace, resultsState.results[selectedRace.season])}
          isLoadingResults={resultsState.isLoading}
          resultsError={resultsState.error}
          selectRace={selectRace}
          getRaceResults={getRaceResults}
        />
      )}
      {route === 'Standings' && (
        <Standings
          season={standingsSeason}
          setSeason={setStandingsSeason}
          drivers={driversState}
          getDriverStandings={getDriverStandings}
          constructors={constructorsState}
          getConstructorStandings={getConstructorStandings}
        />
      )}
      <Footer />
    </ThemeProvider>
  );
}
