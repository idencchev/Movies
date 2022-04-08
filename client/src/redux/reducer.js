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

export const detailsReducer = (stateDetails = { movieDetails: {} }, action) => {


  switch (action.type) {
    case "DETAILS":
      return {
        ...stateDetails,
        movieDetails: action.payload,
      };

    case "REMOVE_DETAILS":
      return {
        ...stateDetails,
        movieDetails: action.payload,
      };
    default:
      return stateDetails;
  }
};

export default { reducer, detailsReducer };
