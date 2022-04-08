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

export default {
  verifyUser,
  login,
  logout,
  addDetails,
  removeDetails,
};
