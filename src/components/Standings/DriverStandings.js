import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator';

export default function DriverStandings({ standings, isLoading, error }) {
  return (
    <>
      <h2 className="responsive-padding">Driver Standings</h2>
      {isLoading && <div className="p3"><LoadingIndicator /></div>}
      {error && <p className="p3">{error.message}</p>}
      {standings && (
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th className="tr" title="Position">Pos.</th>
                <th>Driver</th>
                <th>Constructor</th>
                <th className="tr">Points</th>
                <th className="tr">Wins</th>
              </tr>
            </thead>
            <tbody>
              {standings.map(s => {
                let constructors = '';
                for (let i = 0, l = s.Constructors.length; i < l; i++) {
                  constructors += s.Constructors[i].name;
                  if (i + 1 !== l) {
                    constructors += ', ';
                  }
                }
                return (
                  <tr key={s.Driver.driverId}>
                    <td className="tr">{s.position}.</td>
                    <td>{s.Driver.givenName} {s.Driver.familyName}</td>
                    <td>{constructors}</td>
                    <td className="tr">{s.points}</td>
                    <td className="tr">{s.wins}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

DriverStandings.propTypes = {
  standings: PropTypes.arrayOf(
    PropTypes.shape({
      Constructors: PropTypes.arrayOf(
        PropTypes.shape({
          constructorId: PropTypes.string,
          name: PropTypes.string.isRequired,
          nationality: PropTypes.string,
          url: PropTypes.string
        }).isRequired
      ).isRequired,
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
      points: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      positionText: PropTypes.string,
      wins: PropTypes.string.isRequired
    }).isRequired
  ),
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object
};
