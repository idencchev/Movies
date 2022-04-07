import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import MovieCart from "./MovieCart/MovieCart.js";
import SearchComponent from "./SearchComponent/SearchComponent.js";
import "./Search.css";
import { getAllMovies } from "../../api/data";

function Search() {
  const [movies, setMovies] = useState([]);

  const [{ search }, setSearch] = useState({ search: "" });
  const [searchResults, setSerachResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);

  const getAll = async () => {
    const data = await getAllMovies();
    setMovies(data);
  };

  useEffect(() => {
    getAll();
  }, []);

  const moviesPerPage = 2;
  const pagesVisited = pageNumber * moviesPerPage;

  const pageCount = Math.ceil(
    searchResults.length
      ? searchResults.length / moviesPerPage
      : movies.length / moviesPerPage
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //search
  const searchHandler = (e) => {
    setSearch((prevSearchData) => ({
      ...prevSearchData,
      [e.target.name]: e.target.value,
    }));
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    try {
      if (!search == "") {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${search}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();

        if (data.length) {
          setSerachResults(data);
          setNoResults(false);
        } else {
          setNoResults(true);
        }
      } else {
        getAll();
        setNoResults(false);
        setSerachResults([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const displayMovies = movies
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((movie) => {
      return (
        <MovieCart
          key={movie.id}
          id={movie.id}
          title={movie.name}
          image={movie.image.medium}
          officialSite={movie.officialSite}
          year={movie.premiered}
          description={movie.summary}
          genre={movie.genres}
          averageRuntime={movie.averageRuntime}
        />
      );
    });

  const displaySearchResults = searchResults
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((movie) => {
      return (
        <MovieCart
          key={movie.show.id}
          id={movie.show.id}
          title={movie.show.name}
          image={
            movie.show.image?.medium ||
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          officialSite={movie.show.officialSite}
          year={movie.show.premiered}
          description={movie.show.summary}
          genre={movie.show.genres}
          averageRuntime={movie.show.averageRuntime}
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
            {displaySearchResults.length ? displaySearchResults : displayMovies}
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
