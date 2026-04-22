export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST": {
      // Prevent duplicate entries in the watchlist
      const exists = state.watchlist.some(
        movie => movie.imdbID === action.payload.imdbID
      );

      if (exists) {
        return state;
      }

      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist]
      };
    }
    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          movie => movie.imdbID !== action.payload
        )
      };
    case "ADD_MOVIE_TO_WATCHED": {
      // Prevent duplicate entries in watched list
      const exists = state.watched.some(
        movie => movie.imdbID === action.payload.imdbID
      );

      if (exists) {
        return state;
      }

      return {
        ...state,
        watchlist: state.watchlist.filter(
          movie => movie.imdbID !== action.payload.imdbID
        ),
        watched: [action.payload, ...state.watched]
      };
    }
    case "MOVE_TO_WATCHLIST": {
      // When moving, only move if it does not already exist in watchlist
      const exists = state.watchlist.some(
        movie => movie.imdbID === action.payload.imdbID
      );

      if (exists) {
        return {
          ...state,
          watched: state.watched.filter(
            movie => movie.imdbID !== action.payload.imdbID
          )
        };
      }

      return {
        ...state,
        watched: state.watched.filter(
          movie => movie.imdbID !== action.payload.imdbID
        ),
        watchlist: [action.payload, ...state.watchlist]
      };
    }
    case "REMOVE_MOVIE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter(movie => movie.imdbID !== action.payload)
      };
    default:
      return state;
  }
};
