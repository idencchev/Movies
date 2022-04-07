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

  const onCreateHandler = async (e) => {
    e.preventDefault();
    await registerUser(userData);
    navigate("/");
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

      <form onSubmit={onCreateHandler} className="register-form">
        <label htmlFor="username">Username</label>
        <input
          onChange={onChangeHandler}
          className="register-input"
          type="text"
          placeholder="Username"
          name="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={onChangeHandler}
          className="register-input"
          type="password"
          placeholder="Password"
          name="password"
          required
        />

        <label htmlFor="rePass">Repeat Password</label>
        <input
          onChange={onChangeHandler}
          className="register-input"
          type="password"
          placeholder="Repeat Password"
          name="rePass"
          required
        />
        <input className="btn-register" type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
