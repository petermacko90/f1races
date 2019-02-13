import React from 'react';

const RaceResults = ({ results }) => {
  return (
    <div className='responsiveTable'>
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th className='position'>Pos.</th>
            <th>Driver</th>
            <th>Constructor</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {
            results.map(res => {
              return (
                <tr key={res.position}>
                  <td className='position'>{res.position}.</td>
                  <td>{res.Driver.givenName} {res.Driver.familyName}</td>
                  <td>{res.Constructor.name}</td>
                  <td>{res.Time ? res.Time.time : res.status}</td>
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
