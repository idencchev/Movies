import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import MovieCart from "./MovieCart/MovieCart";
import SearchComponent from "./SearchComponent/SearchComponent";

import { searchFunction } from "../../api/data";
import actions from "../../redux/actions";
import "./Search.css";

function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { addMovieData, addFavorite } = bindActionCreators(
    actions,
    dispatch
  );

  const movieStore = useSelector((state) => state.movieData);
  const { favoriteMovies } = useSelector((state) => state.account);

  const useRefFaforiteMovies = useRef();
  useRefFaforiteMovies.current = favoriteMovies;

  const searchQuery = location.pathname.split("/")[2] || null;

  const [{ search }, setSearch] = useState({ search: "" });

  const [noResults, setNoResults] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    searchFunction(
      searchQuery || search,
      setNoResults,
      navigate,
      useRefFaforiteMovies,
      addMovieData
    );
  }, [searchQuery]);

  const moviesPerPage = 2;
  const pagesVisited = pageNumber * moviesPerPage;

  const pageCount = Math.ceil(movieStore.length / moviesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // search
  const searchHandler = (e) => {
    setSearch((prevSearchData) => ({
      ...prevSearchData,
      [e.target.name]: e.target.value,
    }));
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      searchFunction(
        search,
        setNoResults,
        navigate,
        useRefFaforiteMovies,
        addMovieData
      );
      e.target.search.value = "";
      setSearch({ search: "" });
    } catch (error) {
      console.log(error);
    }
  };

  // display all movies
  const displayMovies = movieStore
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((movie) => {
      return (
        <MovieCart
          key={movie.id}
          id={movie.id}
          title={movie.name}
          image={
            movie.image?.medium ||
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          officialSite={movie.officialSite}
          year={movie.premiered}
          description={movie.summary}
          genre={movie.genres}
          averageRuntime={movie.averageRuntime}
          isFavoriteFromStore={movie.isFavorite}
        />
      );
    });

  return (
    <div className="search-page">
      <div className="search">
        <h1 className="search-h1">Search</h1>
        <SearchComponent
          searchHandler={searchHandler}
          searchMovies={searchMovies}
        />
      </div>
      <div className="movies-list">
        {noResults ? (
          <h2 className="not-found-search">This movie has been not found!</h2>
        ) : (
          <>
            {displayMovies}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
              initialSelected={2}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
