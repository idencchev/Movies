import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const  { username } = useSelector((state) => state.account);

  return (
    <div className="home">
      <div className="home-top">
        <h1 className="home-h1">Movie Library</h1>
        <p className="home-p">
          Welcome {username ? username : null} to the Movie Library. A diverse
          selection of movies to see instantly in your own library.
        </p>
        <Link className="search-link" to="/search">
          Search
        </Link>
      </div>

      <div className="home-bottom">
        <h1 className="your-favorites-h1">Your Favorites</h1>
        <Link to={`/:movieTitle`}>
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054"
            alt="error"
            className="favorite-img"
          />
        </Link>
        <Link to={`/:movieTitle`}>
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054"
            alt="error"
            className="favorite-img"
          />
        </Link>
        <Link to={`/:movieTitle`}>
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054"
            alt="error"
            className="favorite-img"
          />
        </Link>
        <Link to={`/:movieTitle`}>
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-movie-poster-template-design-0f5fff6262fdefb855e3a9a3f0fdd361_screen.jpg?ts=1636996054"
            alt="error"
            className="favorite-img"
          />
        </Link>
      </div>
    </div>
  );
}

export default Home;
