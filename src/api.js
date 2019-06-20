const urlBase = 'https://ergast.com/api/f1';

const fetchData = async (url) => {
  const response = await fetch(url);
  return await response.json();
}

export const fetchRaces = async (season) => {
  const data = await fetchData(`${urlBase}/${season}.json`);
  if (data.MRData.RaceTable.Races.length === 0) {
    throw new Error('No data available');
  }
  return data.MRData.RaceTable.Races;
}

export const fetchRaceResults = async (season, round) => {
  const data = await fetchData(`${urlBase}/${season}/${round}/results.json`);
  if (data.MRData.RaceTable.Races.length === 0) {
    throw new Error('No data available');
  }
  return data.MRData.RaceTable.Races[0].Results;
}

export const fetchDriverStandings = async (season) => {
  const data = await fetchData(`${urlBase}/${season}/driverStandings.json`);
  if (data.MRData.StandingsTable.StandingsLists.length === 0) {
    throw new Error('No data available');
  }
  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
}

export const fetchConstructorStandings = async (season) => {
  const data = await fetchData(`${urlBase}/${season}/constructorStandings.json`);
  if (data.MRData.StandingsTable.StandingsLists.length === 0) {
    throw new Error('No data available');
  }
  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
}
