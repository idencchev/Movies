import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/data.js";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    rePass: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const onCreateHandler = async (e) => {
    e.preventDefault();

    try {
      if (userData.username === "" && userData.password === "") {
        return setErrorMessage("Please enter a username and password!");
      } else if (userData.username === "") {
        return setErrorMessage("Please enter a username!");
      } else if (userData.password === "") {
        return setErrorMessage("Please enter a password!");
      } else if (userData.rePass === "") {
        return setErrorMessage("Please repeat the password!");
      } else if (userData.password !== userData.rePass) {
        return setErrorMessage("The passwords are not same!");
      } else if (userData.username.length < 4) {
        return setErrorMessage("Username must be at least 4 characters long!");
      } else if (userData.password.length < 6) {
        return setErrorMessage("Password must be at least 6 characters long!");
      }

      await registerUser(userData);
      setErrorMessage("");
      navigate("/");
    } catch (error) {
      setErrorMessage(error);
      console.log(error);
    }
  };

  const onChangeHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

  return (
    <div className="register">
      <h1 className="register-h1">REGISTER</h1>
      {errorMessage ? <p className="error-message">{errorMessage}</p> : null}
      <form onSubmit={onCreateHandler} className="register-form">
        <label htmlFor="username">Username</label>
        <input
          onChange={onChangeHandler}
          className="register-input"
          type="text"
          placeholder="Username"
          name="username"
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={onChangeHandler}
          className="register-input"
          type="password"
          placeholder="Password"
          name="password"
        />

        <label htmlFor="rePass">Repeat Password</label>
        <input
          onChange={onChangeHandler}
          className="register-input"
          type="password"
          placeholder="Repeat Password"
          name="rePass"
        />
        <input className="btn-register" type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
