import React from 'react';
import LoadingIndicator from '../LoadingIndicator';

export default function DriverStandings({ standings, isLoading, error }) {
  return (
    <>
      <h2 className="p3">Driver Standings</h2>
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
