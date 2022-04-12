import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { loginUser } from "../../api/data";
import actions from "../../redux/actions";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = bindActionCreators(actions, dispatch);

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

  const [errorMessage, setErrorMessage] = useState("");

  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      if (userData.username === "" && userData.password === "") {
        return setErrorMessage("Please enter a username and password!");
      } else if (userData.username === "") {
        return setErrorMessage("Please enter a username!");
      } else if (userData.password === "") {
        return setErrorMessage("Please enter a password!");
      }

      const response = await loginUser(userData);
      const loginData = {
        isVerified: true,
        username: response.userData.username,
        id: response.userData._id,
        favoriteMovies: response.userData.favoriteMovies,
      };

      login(loginData);
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h1 className="login-h1">LOGIN</h1>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      <form onSubmit={onLoginHandler} className="login-form">
        <label htmlFor="username">Username</label>
        <input
          onChange={onChangeHandler}
          className="login-input"
          type="text"
          placeholder="Username"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={onChangeHandler}
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
        />
        <input className="btn-login" type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
