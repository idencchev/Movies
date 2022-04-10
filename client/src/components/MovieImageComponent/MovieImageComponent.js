import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getMovieById } from "../../api/data.js";
import actions from "../../redux/actions.js";

function MovieImageComponent({ id, title, image, className }) {
  const dispatch = useDispatch();
  const { addDetails } = bindActionCreators(actions, dispatch);
  const { favoriteMovies, userId } = useSelector((state) => state.account);

  const movieDetailsFetch = async () => {
    const data = await getMovieById(id);

    if (!favoriteMovies.some((x) => x == data.id)) {
      addDetails({ ...data, isFavorite: true });
    } else {
      addDetails({ ...data, isFavorite: false });
    }
  };

  return (
    <>
      <Link to={`/${title?.split(" ").join("-")}`}>
        <img
          src={image}
          alt="error"
          className={className}
          onClick={movieDetailsFetch}
        />
      </Link>
    </>
  );
}

export default MovieImageComponent;
