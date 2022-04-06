import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import { logoutUser } from "../../api/data";
import "./Navigation.css";
import { bindActionCreators } from "redux";

function Navigation() {
  const { isVerified } = useSelector((state) => state.account);

  const dispatch = useDispatch();
  const { logout } = bindActionCreators(actions, dispatch);

  const logoutHandler = async () => {
    await logoutUser();
    logout();
  };

  return (
    <div className="nav-user">
      <div className="nav-left">
        <Link className="my-nav-link" to="/">
          Movie Library
        </Link>
      </div>

      <div className="nav-center">
        <form className="nav-search">
          <input className="search-input" type="text" />
          <input className="btn-search" type="submit" value="Search" />
        </form>
      </div>

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
