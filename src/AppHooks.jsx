import React, { useState, useEffect, useReducer } from 'react';
import { ThemeProvider } from './ThemeContext';
import { fetchRaces } from './api';
import { saveTheme, loadTheme, loadRaces, saveRaces } from './localStorage';
import { calendarInitialState, calendarReducer } from './reducers';
import { getDate } from './helpers';
import Header from './components/Header';
import Navigation from './components/Navigation/Navigation';
import RaceList from './components/RaceList/RaceList';
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
  useEffect(() => {
    const getRaces = async () => {
      const races = loadRaces(calendarSeason);
      if (races) {
        calendarDispatch({
          type: 'LOAD_CALENDAR',
          payload: { season: calendarSeason, races }
        });
      } else {
        if (!navigator.onLine) {
          toast.error('You are offline :(');
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
            saveRaces(races, calendarSeason);
          }
        } catch (error) {
          calendarDispatch({ type: 'FETCH_ERROR', payload: error });
        }
      }
    };

    if (!calendarState.races[calendarSeason]) getRaces();
  }, [calendarSeason, calendarState.races]);

  // eslint-disable-next-line
  const [selectedRaceRound, setSelectedRaceRound] = useState(0);

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
  }

  function onSaveRaces() {
    const error = saveRaces(calendarState.races[calendarSeason], calendarSeason);
    if (error) {
      toast.error('Error - calendar was not saved :(');
    } else {
      toast.success('Calendar saved to browser storage');
    }
  }

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
          races={calendarState.races[calendarSeason]}
          upcomingRace={getUpcomingRace(calendarState.races[calendarSeason], calendarSeason, CURRENT_SEASON)}
          isLoading={calendarState.isLoading}
          error={calendarState.error}
          selectRace={selectRace}
          onSaveRaces={onSaveRaces}
          seasonSelect={
            <SeasonSelect
              season={calendarSeason}
              onChangeSeason={setCalendarSeason}
            />
          }
        />
      )}
      <Footer />
    </ThemeProvider>
  );
}
