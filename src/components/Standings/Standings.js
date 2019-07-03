import React, { Component } from 'react';
import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings';
import SeasonSelect from '../SeasonSelect';
import { FIRST_SEASON, CURRENT_SEASON } from '../../constants';

class Standings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      season: CURRENT_SEASON
    };
    this.onChangeSeason = this.onChangeSeason.bind(this);
  }

  componentDidMount() {
    this.getStandings(this.state.season);
  }

  getStandings(season) {
    if (!this.props.driverStandings[season]) {
      this.props.getDriverStandings(season);
    }
    if (!this.props.constructorStandings[season]) {
      this.props.getConstructorStandings(season);
    }
  }

  onChangeSeason(season) {
    if (season >= FIRST_SEASON && season <= CURRENT_SEASON) {
      this.setState({ season });
      this.getStandings(season);
    }
  }

  render() {
    const { season } = this.state;
    const {
      driverStandings, isLoadingDrivers, errorDrivers,
      constructorStandings, isLoadingConstructors, errorConstructors
    } = this.props;

    return (
      <div className='container'>
        <SeasonSelect
          season={season}
          onChangeSeason={(season) => (this.onChangeSeason(season))}
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
}

export default Standings;
