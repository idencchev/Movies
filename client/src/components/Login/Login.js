import { createBrowserHistory } from "history";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { loginUser } from "../../api/data";
import actions from "../../redux/actions";
import "./Login.css";

function Login(props) {
  const dispatch = useDispatch();

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

  const onLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(userData);
      
      const loginData = {
        isVerified: true,
        username: response.userData.username,
        id: response.userData._id,
        favoriteMovies: response.userData.favoriteMovies
      };

      login(loginData);
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h1 className="login-h1">LOGIN</h1>

      <form onSubmit={onLoginHandler} className="login-form">
        <label htmlFor="username">Username</label>
        <input
          onChange={onChangeHandler}
          className="login-input"
          type="text"
          placeholder="Username"
          name="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={onChangeHandler}
          className="login-input"
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input className="btn-login" type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
