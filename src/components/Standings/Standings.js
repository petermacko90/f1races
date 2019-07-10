import React, { useEffect } from 'react';
import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings';
import SeasonSelect from '../SeasonSelect';

export default function Standings({
  season, drivers, constructors,
  setSeason, getDriverStandings, getConstructorStandings
}) {
  const driverStandingsSeason = drivers.standings[season];
  const constructorStandingsSeason = constructors.standings[season];

  useEffect(() => {
    if (!driverStandingsSeason) getDriverStandings();
  }, [driverStandingsSeason, getDriverStandings]);

  useEffect(() => {
    if (!constructorStandingsSeason) getConstructorStandings();
  }, [constructorStandingsSeason, getConstructorStandings]);

  return (
    <div className="container">
      <SeasonSelect
        season={season}
        onChangeSeason={(season) => setSeason(season)}
      />
      <DriverStandings
        standings={drivers.standings[season]}
        isLoading={drivers.isLoading}
        error={drivers.error}
      />
      <ConstructorStandings
        standings={constructors.standings[season]}
        isLoading={constructors.isLoading}
        error={constructors.error}
      />
    </div>
  );
}
