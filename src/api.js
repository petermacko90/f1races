const urlBase = 'http://ergast.com/api/f1/';

const fetchData = (url) => {
  return fetch(url).then(response => response.json());
}

export const fetchRaces = (season) => {
  return fetchData(`${urlBase}${season}.json`)
}

export const fetchNextRace = (season) => {
  return fetchData(`${urlBase}${season}/next.json`);
}

export const fetchRaceResults = (season, round) => {
  return fetchData(`${urlBase}${season}/${round}/results.json`);
}
