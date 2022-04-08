import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getMovieById } from "../../api/data.js";
import actions from "../../redux/actions.js";
import MovieCart from "../Search/MovieCart/MovieCart";

function MovieDetails() {
  const { movieDetails } = useSelector((state) => state.details);

  ///const dispatch = useDispatch();
  ///const { addDetails, removeDetails } = bindActionCreators(actions, dispatch);

  // const movieDetailsFetch = async () => {
  //   const data = await getMovieById(movieDetails.id);

  //   return addDetails(data);
  // };

  // useEffect(() => {

  //   movieDetailsFetch();
  // }, []);

  return (
    <div className="movie-details">
      <div className="movie-details top">
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
        />
      </div>
      <div className="movie-details-bottom">some details here</div>
    </div>
  );
}

export default MovieDetails;
