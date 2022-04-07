import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import "./MovieCart.css";
import MovieImageComponent from "../../MovieImageComponent/MovieImageComponent.js";

function MovieCart({
  id,
  title,
  image,
  officialSite,
  year,
  description,
  genre,
  averageRuntime,
}) {
  const [favorite, setFavoriteState] = useState(true);

  const isFavorite = () => {
    if (favorite) {
      return setFavoriteState(false);
    }
    setFavoriteState(true);
  };

  return (
    <div className="movie-cart">
      <div className="movie-cart-right">
        <MovieImageComponent
          title={title}
          image={image}
          className={"movie-img"}
        />
      </div>

      <div className="movie-cart-left">
        <Link
          className="movie-title-link"
          to={`/${title.split(" ").join("-")}`}
        >
          <h2 className="movie-title">
            {title} ({year?.split("-").shift() || "Year is not available"})
          </h2>
        </Link>

        <p className="genre-time">
          {genre.join(", ") || "Genre is not available"} |{" "}
          {averageRuntime || "not availabe"} minutes
        </p>

        <p className="description">
          {description || "The description is not available."}
        </p>

        <ExternalLink className="movie-official-site" href={officialSite}>
          Visit official site
        </ExternalLink>

        <button onClick={isFavorite} className="add-remove-favorite">
          {favorite ? "Add To Favorites" : "Remove From Favorites"}
        </button>
      </div>
    </div>
  );
}

export default MovieCart;
