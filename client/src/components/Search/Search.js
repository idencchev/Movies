import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import MovieCart from "./MovieCart/MovieCart.js";
import SearchComponent from "./SearchComponent/SearchComponent.js";
import "./Search.css";
import { getAllMovies } from "../../api/data.js";

function Search() {
  const [movies, setMovies] = useState([]);
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

  const pageCount = Math.ceil(movies.length / moviesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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

  return (
    <div className="search-page">
      <div className="search">
        <h1 className="search-h1">Search</h1>
        <SearchComponent />
      </div>

      <div className="movies-list">
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
      </div>
    </div>
  );
}

export default Search;
