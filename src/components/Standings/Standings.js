import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

Standings.propTypes = {
  season: PropTypes.number.isRequired,
  drivers: PropTypes.shape({
    standings: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object
  }).isRequired,
  constructors: PropTypes.shape({
    standings: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object
  }).isRequired,
  setSeason: PropTypes.func.isRequired,
  getDriverStandings: PropTypes.func.isRequired,
  getConstructorStandings: PropTypes.func.isRequired
};
