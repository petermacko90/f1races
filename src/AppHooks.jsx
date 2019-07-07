import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeContext';
import { saveTheme, loadTheme } from './localStorage';
import Header from './components/Header';
import Navigation from './components/Navigation/Navigation';

export default function App() {
  const [ theme, setTheme ] = useState('');
  useEffect(() => {
    setTheme(loadTheme());
  }, []);

  const [ route, setRoute ] = useState('RaceList');

  function setAndSaveTheme(theme) {
    setTheme(theme);
    saveTheme(theme);
  }

  return (
    <ThemeProvider value={theme}>
      <Header setTheme={setAndSaveTheme} />
      <Navigation route={route} setRoute={setRoute} />
    </ThemeProvider>
  );
}
