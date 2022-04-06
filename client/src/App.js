import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import MovieDescription from "./components/MovieDescription/MovieDescription";
import Navigation from "./components/Navigation/Navigation";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Navigation />
      </header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/:movieTitle" element={<MovieDescription />} />
      </Routes>
    </div>
  );
}

export default App;
