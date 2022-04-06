import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import { verifyToken } from "./api/data";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MovieDescription from "./components/MovieDescription/MovieDescription";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import Search from "./components/Search/Search";
import actions from "./redux/actions";

function App() {
  const dispatch = useDispatch();
  const { verifyUser } = bindActionCreators(actions, dispatch);

  const verify = async () => {
    const verifyData = await verifyToken();
    if (verifyData.isVerified) {
      return verifyUser(verifyData);
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
        <Route exact path="/:movieTitle" element={<MovieDescription />} />
      </Routes>
    </>
  );
}

export default App;
