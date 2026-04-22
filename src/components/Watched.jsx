import React, { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const Watched = () => {
  const { watched } = useContext(GlobalContext);
  const [filterText, setFilterText] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const visibleMovies = useMemo(() => {
    let movies = [...watched];

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
  }, [watched, filterText, sortBy]);

  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading">Watched Movies</h1>

          <span className="count-pill">
            {watched.length}
            {watched.length === 1 ? " Movie" : " Movies"}
          </span>
        </div>

        {watched.length > 0 && (
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
              <MovieCard key={movie.imdbID} movie={movie} type="watched" />
            ))}
          </div>
        ) : watched.length > 0 ? (
          <p className="no-filter-results">
            No movies match your current filter. Clear it to see all movies.
          </p>
        ) : (
          <div className="hero-empty-card alt">
            <div className="hero-content">
              <p className="eyebrow">Track your progress</p>
              <h2>Nothing marked as watched yet…</h2>
              <p>
                Move titles here once you finish them to keep track of your movie
                journey and ratings.
              </p>
              <Link className="btn" to="/">
                Back to Watchlist
              </Link>
            </div>
            <div className="hero-visual popcorn">
              <div className="hero-glow"></div>
              <div className="popcorn-box">
                <span role="img" aria-label="popcorn">
                  🍿
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watched;
