const initialState = {
  isVerified: false,
  username: null,
  userId: null,
  favoriteMovies: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isVerified: action.payload.isVerified,
        username: action.payload.username,
        userId: action.payload.id,
        favoriteMovies: action.payload.favoriteMovies,
      };

    case "LOGOUT":
      return {
        ...state,
        isVerified: false,
        username: null,
        userId: null,
        favoriteMovies: [],
      };

    case "VERIFY":
      return {
        ...state,
        isVerified: action.payload.isVerified,
        username: action.payload.username,
        userId: action.payload.id,
        favoriteMovies: action.payload.favoriteMovies,
      };
    default:
      return state;
  }
};

export const detailsReducer = (state = { movieDetails: {} }, action) => {
  switch (action.type) {
    case "DETAILS":
      return {
        ...state,
        movieDetails: { ...action.payload, isFavorite: true },
      };

    case "REMOVE_DETAILS":
      return {
        ...state,
        movieDetails: action.payload,
      };
    default:
      return state;
  }
};

export const movieDataReducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD":
      return [...action.payload];
    case "DELETE":
      return [];

    case "ADD_FAVORITE":
    ///console.log(state);
    default:
      return state;
  }
};

export default { reducer, detailsReducer };
