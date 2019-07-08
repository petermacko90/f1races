export const calendarInitialState = {
  races: {},
  isLoading: false,
  error: null
};

export const calendarReducer = (state, action) => {
  switch(action.type) {
    case 'LOAD_CALENDAR':
      return {
        ...state,
        isLoading: false,
        error: null,
        races: {
          ...state.races,
          ...{ [action.payload.season]: action.payload.races }
        }
      }
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
