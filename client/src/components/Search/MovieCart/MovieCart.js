import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-external-link";
import { useSelector } from "react-redux";
import "./MovieCart.css";
import MovieImageComponent from "../../MovieImageComponent/MovieImageComponent.js";
import { addFavoriteMovie, deleteFavoriteMovie } from "../../../api/data.js";

function MovieCart({
  id,
  title,
  image,
  officialSite,
  year,
  description,
  genre,
  averageRuntime,
  isFavoriteFromStore
}) {
  const { isVerified, userId } = useSelector((state) => state.account);
  const [favorite, setFavoriteState] = useState(true);

  const isFavorite = async () => {
   //// console.log(id, userId);
    if (favorite) {
      const add = await addFavoriteMovie({ movieId: id, id: userId });
      return setFavoriteState(false);
    }
    const remove = await deleteFavoriteMovie({ movieId: id, id: userId });
    setFavoriteState(true);
  };

  return (
    <div className="movie-cart">
      <div className="movie-cart-right">
        <MovieImageComponent
          id={id}
          title={title}
          image={image}
          className={"movie-img"}
        />
      </div>

      <div className="movie-cart-left">
        <Link
          className="movie-title-link"
          to={`/${title?.split(" ").join("-")}`}
        >
          <h2 className="movie-title">
            {title} ({year?.split("-").shift() || "Year is not available"})
          </h2>
        </Link>

        <p className="genre-time">
          {genre?.join(", ") || "Genre is not available"} |{" "}
          {averageRuntime || "not availabe"} minutes
        </p>

        <p className="description">
          {description || "The description is not available."}
        </p>

        <ExternalLink className="movie-official-site" href={officialSite}>
          Visit official site
        </ExternalLink>

        {isVerified ? (
          <button
            onClick={isFavorite}
            className={isFavoriteFromStore ? "add-favorite" : "remove-favorite"}
          >
            {isFavoriteFromStore ? "Add To Favorites" : "Remove From Favorites"}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default MovieCart;
