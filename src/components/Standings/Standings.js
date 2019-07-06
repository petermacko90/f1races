import React, { useState, useEffect } from 'react';
import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings';
import SeasonSelect from '../SeasonSelect';
import { FIRST_SEASON, CURRENT_SEASON } from '../../constants';

export default function Standings({
  getDriverStandings, getConstructorStandings,
  driverStandings, isLoadingDrivers, errorDrivers,
  constructorStandings, isLoadingConstructors, errorConstructors
}) {
  const [ season, setSeason ] = useState(CURRENT_SEASON);

  useEffect(() => {
    if (!driverStandings[season]) {
      getDriverStandings(season);
    }
  }, [season, driverStandings, getDriverStandings]);

  useEffect(() => {
    if (!constructorStandings[season]) {
      getConstructorStandings(season);
    }
  }, [season, constructorStandings, getConstructorStandings]);

  function onChangeSeason(season) {
    if (season >= FIRST_SEASON && season <= CURRENT_SEASON) {
      setSeason(season);
    }
  }

  return (
    <div className="container">
      <SeasonSelect
        season={season}
        onChangeSeason={(season) => onChangeSeason(season)}
      />
      <DriverStandings
        standings={driverStandings[season]}
        isLoading={isLoadingDrivers}
        error={errorDrivers}
      />
      <ConstructorStandings
        standings={constructorStandings[season]}
        isLoading={isLoadingConstructors}
        error={errorConstructors}
      />
    </div>
  );
}
