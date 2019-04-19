import React from 'react';
import './RaceResults.css';

const RaceResults = ({ results }) => {
  return (
    <div className='responsive-table'>
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th className='tr' title='Finish Position'>Pos.</th>
            <th className='tr' title='Grid Position'>Grid</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Time</th>
            <th className='tr'>Laps</th>
            <th>Status</th>
            <th className='tr' title='Points'>Pts</th>
            <th>Fastest Lap</th>
            <th title='Average Speed'>Avg Speed</th>
          </tr>
        </thead>
        <tbody>
          {
            results.map(res => {
              return (
                <tr key={res.Driver.driverId + res.position}>
                  <td className='tr'>{res.position}.</td>
                  <td className='tr'>
                    {res.grid === '0' ? 'Pit Lane' : (res.grid + '.')}
                  </td>
                  <td>{res.Driver.givenName} {res.Driver.familyName}</td>
                  <td>{res.Constructor.name}</td>
                  <td>{res.Time ? res.Time.time : 'N/A'}</td>
                  <td className='tr'>{res.laps}</td>
                  <td>{res.status}</td>
                  <td className='tr'>{res.points}</td>
                  <td
                    className={res.FastestLap && res.FastestLap.rank === '1' ? 'fastest' : ''}
                  >
                    {res.FastestLap ? res.FastestLap.Time.time: 'N/A'}
                  </td>
                  <td>
                    { res.FastestLap
                      ? `${res.FastestLap.AverageSpeed.speed} ${res.FastestLap.AverageSpeed.units}`
                      : 'N/A'
                    }
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default RaceResults;
