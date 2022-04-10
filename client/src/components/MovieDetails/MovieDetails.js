import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import MovieCart from "../Search/MovieCart/MovieCart";

import { getMovieByTitle, getAllMovies } from "../../api/data";
import actions from "../../redux/actions";
import "./MovieDetails.css";

function MovieDetails() {
  const { movieDetails } = useSelector((state) => state.details);
  const params = useParams();
  const title = params.movieTitle.split("-").join(" ");

  const { favoriteMovies } = useSelector((state) => state.account);

  const useRefState = useRef();
  useRefState.current = favoriteMovies;

  const dispatch = useDispatch();

  const { addDetails, addMovieData } = bindActionCreators(actions, dispatch);

  const fetchMovie = async () => {
    const data = await getMovieByTitle(title);
    const allMovies = await getAllMovies();
    // update the details store after refresh
    addMovieData(allMovies);
    // check id the movie is favorite and push the data depend of the result
    if (!useRefState.current.some((x) => x == data.id)) {
      addDetails({ ...data, isFavorite: true });
    } else {
      addDetails({ ...data, isFavorite: false });
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = () => {
    setRating(5);
    console.log(rating);
    // other logic
  };

  return (
    <div className="movie-details">
      <div className="movie-details-top">
        <MovieCart
          key={movieDetails.id}
          id={movieDetails.id}
          title={movieDetails.name}
          image={movieDetails.image?.medium}
          officialSite={movieDetails.officialSite}
          year={movieDetails.premiered}
          description={movieDetails.summary}
          genre={movieDetails.genres}
          averageRuntime={movieDetails.averageRuntime}
          isFavoriteFromStore={movieDetails.isFavorite}
        />
      </div>
      <div className="movie-details-bottom">
        <div className="movie-details-bottom-left">
          <h1 className="movie-details-bottom-h1">Your Review</h1>
          <div className="movie-rating">
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              readonly={rating > 0}
            />
          </div>
          <form className="comments-form">
            <textarea
              name="movieComment"
              id=""
              cols="30"
              rows="10"
              className="movie-comments-textarea"
              placeholder="Your private notes and comments about the movie..."
            ></textarea>
            <input type="submit" className="submit-comment" value="Submit" />
          </form>
        </div>
        <div className="movie-details-bottom-right">
          <p className="comments">
            Ivan: lorem ipsum dolor sit am lorem ipsum dolor sit
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
