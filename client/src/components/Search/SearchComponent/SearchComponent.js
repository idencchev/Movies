import React from "react";
import "./SearchComponent.css";

function SearchComponent() {
  return (
    <div className="nav-center">
      <form className="nav-search">
        <input
          className="search-input"
          type="text"
          placeholder="Search by movie title..."
        />
        <input className="btn-search" type="submit" value="Search" />
      </form>
    </div>
  );
}

export default SearchComponent;
