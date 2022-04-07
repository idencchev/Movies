import React from "react";
import { getMovieById } from "../../api/data.js";
import MovieCart from "../Search/MovieCart/MovieCart";

function MovieDetails(props) {

console.log(props);


  return (
    <div className="movie-details">
      <div className="movie-details top">
        <MovieCart
         // id={"asdasdas"}
          title={"asdasdas"}
          image={"asdasdas"}
          officialSite={"asdasdas"}
          year={"asdasdas"}
          description={"asdasdas"}
          genre={["asdasdas"]}
          averageRuntime={"asdasdas"}
        />
      </div>
      <div className="movie-details-bottom">some details here</div>
    </div>
  );
}

export default MovieDetails;
