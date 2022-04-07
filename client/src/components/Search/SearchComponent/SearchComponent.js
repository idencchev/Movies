import React from "react";
import "./SearchComponent.css";

function SearchComponent({ searchHandler, searchMovies }) {
  return (
    <div className="nav-center">
      <form onSubmit={searchMovies} className="nav-search">
        <input
          onChange={searchHandler}
          className="search-input"
          type="text"
          placeholder="Search by movie title..."
          name="search"
        />
        <input className="btn-search" type="submit" value="Search" />
      </form>
    </div>
  );
}

export default SearchComponent;
