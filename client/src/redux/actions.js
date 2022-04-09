const verifyUser = (verifyData) => {
  return (dispatch) => {
    dispatch({
      type: "VERIFY",
      payload: verifyData,
    });
  };
};

const login = (loginData) => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN",
      payload: loginData,
    });
  };
};

const logout = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
    });
  };
};

const updateFavorites = (data) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_FAVORITES",
      payload: data,
    });
  };
};

const addDetails = (data) => {
  return (dispatch) => {
    dispatch({
      type: "DETAILS",
      payload: data,
    });
  };
};

const removeDetails = () => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_DETAILS",
      payload: {},
    });
  };
};

const addMovieData = (data) => {
  return (dispatch) => {
    dispatch({
      type: "LOAD",
      payload: data,
    });
  };
};

const deleteMovieData = () => {
  return (dispatch) => {
    dispatch({
      type: "DELETE",
    });
  };
};

const addFavorite = (id) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_FAVORITE",
      payload: id,
    });
  };
};

const removeFavorite = (id) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: id,
    });
  };
};

export default {
  verifyUser,
  login,
  logout,
  addDetails,
  removeDetails,
  addMovieData,
  addFavorite,
  deleteMovieData,
  removeFavorite,
  updateFavorites
};
