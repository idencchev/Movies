import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import { bindActionCreators } from "redux";

import SearchComponent from "../Search/SearchComponent/SearchComponent";

import { logoutUser } from "../../api/data";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isVerified } = useSelector((state) => state.account);
  const { logout } = bindActionCreators(actions, dispatch);

  const logoutHandler = async () => {
    await logoutUser();
    logout();
    navigate("/");
  };

  const [{ search }, setSearch] = useState({ search: "" });

  const searchHandler = (e) => {
    setSearch((prevSearchData) => ({
      ...prevSearchData,
      [e.target.name]: e.target.value,
    }));
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
    e.target.search.value = "";
  };

  return (
    <div className="nav-user">
      <div className="nav-left">
        <Link className="my-nav-link" to="/">
          Movie Library
        </Link>
      </div>

      <SearchComponent
        searchHandler={searchHandler}
        searchMovies={searchMovies}
      />

      <div className="nav-right">
        {!isVerified ? (
          <>
            <Link className="my-nav-link" to="/login">
              Login
            </Link>
            <Link className="my-nav-link" to="/register">
              Register
            </Link>
          </>
        ) : (
          <Link className="my-nav-link" to="/" onClick={logoutHandler}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navigation;
