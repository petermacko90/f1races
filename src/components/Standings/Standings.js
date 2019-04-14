import React, { Component } from 'react';
import DriverStandings from './DriverStandings';

class Standings extends Component {
  componentDidMount() {
    if (!this.props.driverStandings[this.props.season]) {
      this.props.getDriverStandings(this.props.season);
    }
  }

  render() {
    const {
      season, driverStandings, isLoadingDrivers, errorDrivers
    } = this.props;

    return (
      <div className='container'>
        {this.props.seasonSelect}
        <DriverStandings
          standings={driverStandings[season]}
          isLoading={isLoadingDrivers}
          error={errorDrivers}
        />
      </div>
    );
  }
}

export default Standings;
