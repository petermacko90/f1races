import PropTypes from 'prop-types';

export const racePropType = {
  Circuit: PropTypes.shape({
    Location: PropTypes.shape({
      country: PropTypes.string.isRequired,
      lat: PropTypes.string,
      locality: PropTypes.string.isRequired,
      long: PropTypes.string
    }).isRequired,
    circuitId: PropTypes.string,
    circuitName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  date: PropTypes.string.isRequired,
  raceName: PropTypes.string.isRequired,
  round: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired,
  time: PropTypes.string,
  url: PropTypes.string.isRequired
};

export const resultPropType = {
  Constructor: PropTypes.shape({
    constructorId: PropTypes.string,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  Driver: PropTypes.shape({
    code: PropTypes.string,
    dateOfBirth: PropTypes.string,
    driverId: PropTypes.string.isRequired,
    familyName: PropTypes.string.isRequired,
    givenName: PropTypes.string.isRequired,
    nationality: PropTypes.string,
    permanentNumber: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  FastestLap: PropTypes.shape({
    AverageSpeed: PropTypes.shape({
      speed: PropTypes.string,
      units: PropTypes.string
    }),
    Time: PropTypes.shape({
      time: PropTypes.string
    }),
    lap: PropTypes.string,
    rank: PropTypes.string
  }),
  Time: PropTypes.shape({
    millis: PropTypes.string,
    time: PropTypes.string
  }),
  grid: PropTypes.string.isRequired,
  laps: PropTypes.string.isRequired,
  number: PropTypes.string,
  points: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  positionText: PropTypes.string,
  status: PropTypes.string.isRequired
};
