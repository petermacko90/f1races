import React from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../LoadingIndicator';

export default function ConstructorStandings({ standings, isLoading, error }) {
  return (
    <>
      <h2 className="p3">Constructor Standings</h2>
      {isLoading && <div className="p3"><LoadingIndicator /></div>}
      {error && <p className="p3">{error.message}</p>}
      {standings && (
        <div className="responsive-table">
          <table>
            <thead>
              <tr>
                <th className="tr" title="Position">Pos.</th>
                <th>Constructor</th>
                <th className="tr">Points</th>
                <th className="tr">Wins</th>
              </tr>
            </thead>
            <tbody>
              {standings.map(s => (
                <tr key={s.Constructor.name}>
                  <td className="tr">{s.position}.</td>
                  <td>{s.Constructor.name}</td>
                  <td className="tr">{s.points}</td>
                  <td className="tr">{s.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

ConstructorStandings.propTypes = {
  standings: PropTypes.arrayOf(
    PropTypes.shape({
      Constructor: PropTypes.shape({
        constructorId: PropTypes.string,
        name: PropTypes.string.isRequired,
        nationality: PropTypes.string,
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
