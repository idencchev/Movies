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
      type: "DELETE"
    });
  };
};

const addFavorite = () => {
  return (dispatch) => {
    dispatch({
      type: "ADD_FAVORITE"
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
  deleteMovieData
};
