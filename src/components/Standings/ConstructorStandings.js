import React, { Fragment } from 'react';

const ConstructorStandings = ({ standings, isLoading, error }) => {
  return (
    <Fragment>
      <h2 className='p10'>Constructor Standings</h2>
      { isLoading && <p className='p10'>Loading...</p> }
      { error && <p className='p10'>{error.message}</p> }
      { standings &&
        <div className='responsive-table'>
          <table>
            <thead>
              <tr>
                <th className='tr' title='Position'>Pos.</th>
                <th>Constructor</th>
                <th className='tr'>Points</th>
                <th className='tr'>Wins</th>
              </tr>
            </thead>
            <tbody>
              {
                standings.map(s => {
                  return (
                    <tr key={s.Constructor.name}>
                      <td className='tr'>{s.position}.</td>
                      <td>{s.Constructor.name}</td>
                      <td className='tr'>{s.points}</td>
                      <td className='tr'>{s.wins}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      }
    </Fragment>
  );
}

export default ConstructorStandings;
