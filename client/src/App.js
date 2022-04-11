import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getUserDataById, verifyToken } from "./api/data";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import Search from "./components/Search/Search";
import actions from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const { verifyUser } = bindActionCreators(actions, dispatch);
  const navigate = useNavigate();
  const location = useLocation();

  const verify = async () => {
    const verifyData = await verifyToken();

    if (verifyData.isVerified) {
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/");
      }
      const userData = await getUserDataById(verifyData.id);
      return verifyUser(userData);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      <header className="app-header">
        <Navigation />
      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/search/:search" element={<Search />} />
        <Route exact path="/:movieTitle" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
