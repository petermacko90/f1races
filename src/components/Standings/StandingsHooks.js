import React, { useEffect } from 'react';
import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings';

const Standings = ({
  seasonSelect, season, getDriverStandings, getConstructorStandings,
  driverStandings, isLoadingDrivers, errorDrivers,
  constructorStandings, isLoadingConstructors, errorConstructors
}) => {
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

  return (
    <div className='container'>
      {seasonSelect}
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

export default Standings;
