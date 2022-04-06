import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MovieDescription from "./components/MovieDescription/MovieDescription";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="app">
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
    </div>
  );
}

export default App;
