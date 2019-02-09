const urlBase = 'http://ergast.com/api/f1/';

const fetchData = (url) => {
  return fetch(url).then(response => response.json());
}

export const fetchCurrentRaces = () => {
  return fetchData(urlBase + 'current.json');
}

export const fetchNextRace = () => {
  return fetchData(urlBase + 'current/next.json');
}

export const fetchRaceResults = (season, round) => {
  return fetchData(`${urlBase}${season}/${round}/results.json`);
}
