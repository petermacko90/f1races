import deepmerge from 'deepmerge';

export const calendarInitialState = {
  races: {},
  isLoading: false,
  error: null
};

export const calendarReducer = (state, action) => {
  switch(action.type) {
    case 'CLEAR_ERROR':
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        races: {
          ...state.races,
          ...{ [action.payload.season]: action.payload.races }
        }
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export const resultsInitialState = {
  results: {},
  isLoading: false,
  error: null
};

export const resultsReducer = (state, action) => {
  switch(action.type) {
    case 'CLEAR_ERROR':
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      const newResults = {
        [action.payload.season]: {
          [action.payload.round]: action.payload.results
        }
      };
      return {
        ...state,
        isLoading: false,
        error: null,
        results: deepmerge(state.results, newResults)
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export const driversInitialState = {
  standings: {},
  isLoading: false,
  error: null
};

export const driversReducer = (state, action) => {
  switch(action.type) {
    case 'CLEAR_ERROR':
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        standings: {
          ...state.standings,
          ...{ [action.payload.season]: action.payload.standings }
        }
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export const constructorsInitialState = {
  standings: {},
  isLoading: false,
  error: null
};

export const constructorsReducer = (state, action) => {
  switch(action.type) {
    case 'CLEAR_ERROR':
      return {
        ...state,
        isLoading: false,
        error: null
      };
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        standings: {
          ...state.standings,
          ...{ [action.payload.season]: action.payload.standings }
        }
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
