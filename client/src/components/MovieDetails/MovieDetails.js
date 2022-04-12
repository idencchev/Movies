import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { TailSpin } from "react-loader-spinner";

import MovieCart from "../Search/MovieCart/MovieCart";

import {
  getMovieByTitle,
  getAllMovies,
  getNoteByMovieId,
  createMovieNote,
  deleteMovieNote,
  getRatingByMovieId,
  setMovieRating,
} from "../../api/data";
import actions from "../../redux/actions";
import "./MovieDetails.css";

function MovieDetails() {
  const dispatch = useDispatch();

  // loading
  const { startLoading, stopLoading } = bindActionCreators(actions, dispatch);
  const isLoading = useSelector((state) => state.loading);

  // take movie title from params
  const params = useParams();
  const title = params.movieTitle.split("-").join(" ");

  // movie details store
  const { movieDetails } = useSelector((state) => state.details);

  // user data store
  const { favoriteMovies, userId, username, isVerified } = useSelector(
    (state) => state.account
  );

  const { addDetails, addMovieData } = bindActionCreators(actions, dispatch);

  const useRefFavoriteMovies = useRef();
  useRefFavoriteMovies.current = favoriteMovies;

  const useRefUserId = useRef();
  useRefUserId.current = userId;

  // notes
  const [notesState, setNotesState] = useState([]);
  const [{ note }, setChangeNotes] = useState({ note: "" });

  const [rating, setRating] = useState(0); // initial rating value

  // error message
  const [isError, setIsError] = useState(false);

  const fetchMovie = async () => {
    const data = await getMovieByTitle(title);
    const allMovies = await getAllMovies();
    stopLoading();
    // update the details store after refresh
    addMovieData(allMovies);
    // check id the movie is favorite and push the data depend of the result
    if (!useRefFavoriteMovies.current.some((x) => x == data.id)) {
      addDetails({ ...data, isFavorite: true });
    } else {
      addDetails({ ...data, isFavorite: false });
    }

    // fetch notes and rating data if user is logged in
    if (useRefUserId.current) {
      const notes = await getNoteByMovieId(data.id);
      setNotesState(notes);

      const rateData = await getRatingByMovieId(data.id, useRefUserId.current);
      if (rateData.length) {
        setRating(rateData[0].rating);
      }
    }
  };

  useEffect(() => {
    startLoading();
    fetchMovie();
  }, []);

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

    if (note.length < 10) {
      return setIsError(true);
    }

    const data = await createMovieNote(noteData);
    setNotesState((prevState) => {
      return [...prevState, data];
    });

    e.target.reset();
    setIsError(false);
    setChangeNotes({ note: "" });
  };

  const deleteNote = async (id) => {
    await deleteMovieNote(id);
    setNotesState(notesState.filter((note) => note._id !== id));
  };

  // rating
  const ratinguseRef = useRef(0);

  const handleRating = async () => {
    const rate = Number(ratinguseRef.current.textContent);

    setRating(rate * 20);

    const rateData = {
      movieId: movieDetails.id,
      userId: userId,
      rating: rate * 20,
    };
    setMovieRating(rateData);
  };

  return (
    <div className="movie-details">
      {isLoading ? (
        <TailSpin
          color="#c2fbd7"
          wrapperStyle={{ marginTop: "100px", justifyContent: "space-around" }}
        />
      ) : (
        <>
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
          {isVerified ? (
            <>
              <div className="movie-details-bottom">
                <div className="movie-details-bottom-left">
                  <h1 className="movie-details-bottom-h1">Your Review</h1>
                  <div className="movie-rating" ref={ratinguseRef}>
                    <Rating
                      onClick={handleRating}
                      ratingValue={rating}
                      showTooltip={true}
                    />
                  </div>
                  {isError ? (
                    <p className="error-message">
                      Your comment must be at least 10 characters long!
                    </p>
                  ) : null}
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
                    <input
                      type="submit"
                      className="submit-comment"
                      value="Submit"
                    />
                  </form>
                </div>
                <div className="movie-details-bottom-right">
                  {notesState.length ? (
                    notesState.map((note) => {
                      return (
                        <div className="note">
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
                        </div>
                      );
                    })
                  ) : (
                    <p className="comments">There is no comments yet.</p>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

export default MovieDetails;
