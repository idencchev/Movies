import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFavoriteMovies } from "../../api/data.js";
import MovieImageComponent from "../MovieImageComponent/MovieImageComponent.js";
import "./Home.css";

function Home() {
  const { username, favoriteMovies, isVerified } = useSelector(
    (state) => state.account
  );

  const [favorite, setFavorite] = useState([]);

  const favoriteMoviesData = () => {
    favoriteMovies.forEach(async (id) => {
      const data = await getFavoriteMovies(id);
     
      setFavorite((oldState) => {
        return [...oldState, data];
      });

     
    });
  };

  useEffect(() => {
    favoriteMoviesData();
  }, []);

  //console.log(favorite);

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
        {isVerified ? (
          <>
            {favorite.length ? (
              <>
                {favorite.map((movie) => {
                  return (
                    <MovieImageComponent
                      className={"favorite-img"}
                      key={movie.id}
                      image={movie.image.medium}
                      title={movie.name}
                    />
                  );
                })}
              </>
            ) : (
              <p className="favorite-p">You don't have favorite movies yet!</p>
            )}
          </>
        ) : (
          <p className="favorite-p">
            Please log in to see your favorite movies!
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
