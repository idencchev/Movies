import React from "react";
import { Link } from "react-router-dom";

function MovieImageComponent({ title, image, className }) {
  return (
    <>
      <Link to={`/${title.split(" ").join("-")}`}>
        <img src={image} alt="error" className={className} />
      </Link>
    </>
  );
}

export default MovieImageComponent;