import React, { useState } from "react";
import MovieControls from "./MovieControls";
import MovieDetailModal from "./MovieDetailModal";

const MovieCard = ({ movie, type }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        className="movie-card"
        onClick={() => {
          setShowDetails(true);
        }}
      >
      <div className="overlay"></div>

      {movie.Poster === "N/A" ? (
        <div className="filler-poster"></div>
      ) : (
        <img src={`${movie.Poster}`} alt={`${movie.Title} Poster`} />
      )}

      <div className="movie-meta">
        <span className="movie-title">{movie.Title}</span>
        {movie.Year && <span className="movie-year">{movie.Year}</span>}
      </div>

        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <MovieControls type={type} movie={movie} />
        </div>
      </div>

      {showDetails && (
        <MovieDetailModal
          imdbID={movie.imdbID}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default MovieCard;
