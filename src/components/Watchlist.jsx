import React, { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const visibleMovies = useMemo(() => {
    let movies = [...watchlist];

    if (filterText.trim()) {
      const term = filterText.toLowerCase();
      movies = movies.filter(movie =>
        (movie.Title || "").toLowerCase().includes(term)
      );
    }

    movies.sort((a, b) => {
      if (sortBy === "year") {
        return (parseInt(b.Year, 10) || 0) - (parseInt(a.Year, 10) || 0);
      }

      // default: sort by title
      const titleA = (a.Title || "").toLowerCase();
      const titleB = (b.Title || "").toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });

    return movies;
  }, [watchlist, filterText, sortBy]);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">My Movies Watchlist</h1>

          <span className="count-pill">
            {watchlist.length}
            {watchlist.length === 1 ? " Movie" : " Movies"}
          </span>
        </div>

        {watchlist.length > 0 && (
          <div className="list-controls">
            <input
              type="text"
              className="list-filter-input"
              placeholder="Filter by title"
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
            />
            <select
              className="list-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="title">Sort by Title (A-Z)</option>
              <option value="year">Sort by Year (newest)</option>
            </select>
          </div>
        )}

        {visibleMovies.length > 0 ? (
          <div className="movie-grid">
            {visibleMovies.map(movie => (
              <MovieCard key={movie.imdbID} movie={movie} type="watchlist" />
            ))}
          </div>
        ) : watchlist.length > 0 ? (
          <p className="no-filter-results">
            No movies match your current filter. Clear it to see all movies.
          </p>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="no-movies">
              There are no movies in your watchlist!
            </h2>
            <div className="mt-8">
              <Link to="/" className="btn">
                Search Movies
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
