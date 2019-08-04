export const getDate = (date, time) => {
  return time ? new Date(date + 'T' + time) : new Date(date);
}

export function getUpcomingRace(races, season, currentSeason) {
  if (races && season === currentSeason) {
    for (let i = 0, l = races.length, d = new Date(); i < l; i++) {
      if (d < getDate(races[i].date, races[i].time)) {
        return races[i].round;
      }
    }
  }
  return '';
}

export function getSelectedRace(selectedRaceRound, races) {
  if (selectedRaceRound > 0 && races) {
    const i = races.findIndex(r => Number(r.round) === selectedRaceRound);
    return races[i];
  }
  return null;
}

export function getResults(selectedRace, results) {
  if (selectedRace && results) {
    return results[selectedRace.round];
  }
  return null;
}
