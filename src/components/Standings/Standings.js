import React, { Component } from 'react';
import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings';

class Standings extends Component {
  componentDidMount() {
    const { season } = this.props;
    if (!this.props.driverStandings[season]) {
      this.props.getDriverStandings(season);
    }
    if (!this.props.constructorStandings[season]) {
      this.props.getConstructorStandings(season);
    }
  }

  render() {
    const {
      season, driverStandings, isLoadingDrivers, errorDrivers,
      constructorStandings, isLoadingConstructors, errorConstructors
    } = this.props;

    return (
      <div className='container'>
        {this.props.seasonSelect}
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
}

export default Standings;
