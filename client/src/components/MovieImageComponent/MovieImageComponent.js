import React from "react";
import { Link } from "react-router-dom";

function MovieImageComponent({ id, title, image, className }) {
  console.log(id);

  const movieDetails = () => {
    console.log(id);
  };

  return (
    <>
      <Link to={`/${title.split(" ").join("-")}`}>
        <img
          src={image}
          alt="error"
          className={className}
          onClick={movieDetails}
        />
      </Link>
    </>
  );
}

export default MovieImageComponent;
