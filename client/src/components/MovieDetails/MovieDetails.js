import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import MovieCart from "../Search/MovieCart/MovieCart";

import {
  getMovieByTitle,
  getAllMovies,
  getNoteByMovieId,
  createMovieNote,
  deleteMovieNote,
} from "../../api/data";
import actions from "../../redux/actions";
import "./MovieDetails.css";

function MovieDetails() {
  const dispatch = useDispatch();

  const params = useParams();
  const title = params.movieTitle.split("-").join(" ");

  const { movieDetails } = useSelector((state) => state.details);
  const { favoriteMovies, userId, username } = useSelector(
    (state) => state.account
  );

  const useRefState = useRef();
  useRefState.current = favoriteMovies;

  const { addDetails, addMovieData } = bindActionCreators(actions, dispatch);

  // notes
  const [notesState, setNotesState] = useState([]);
  const [{ note }, setChangeNotes] = useState({});

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
    // notes
    const notes = await getNoteByMovieId(data.id);
    setNotesState(notes);
  };

  // notes
  const onChangeHandler = (e) => {
    setChangeNotes((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.toLowerCase(),
    }));
  };

  const submitNoteHandler = async (e) => {
    e.preventDefault();
    const noteData = {
      movieId: movieDetails.id,
      user: {
        username: username,
        userId: userId,
      },
      note: note,
    };

    if (note) {
      const data = await createMovieNote(noteData);
      setNotesState((prevState) => {
        return [...prevState, data];
      });
    }
  };

  const deleteNote = async (id) => {
    await deleteMovieNote(id);
    setNotesState(notesState.filter((note) => note._id !== id));
  };

  useEffect(() => {
    fetchMovie();
  }, []);


  // rating
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
          <form onSubmit={submitNoteHandler} className="comments-form">
            <textarea
              onChange={onChangeHandler}
              name="note"
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
          {notesState.map((note) => {
            return (
              <>
                <p className="comments" key={note._id}>
                  {note.user.username}: {note.note}
                </p>
                {note.user.userId == userId ? (
                  <button
                    key={note._id + "1"}
                    onClick={() => deleteNote(note._id)}
                    className="delete-note"
                  >
                    Delete
                  </button>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
