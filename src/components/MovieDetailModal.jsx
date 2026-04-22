import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_OMDB_KEY || "6dcd7e16";

const MovieDetailModal = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!imdbID) return;

    setIsLoading(true);
    setError("");

    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(
        imdbID
      )}&plot=full`
    )
      .then(res => res.json())
      .then(data => {
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Could not load movie details.");
        }
      })
      .catch(() => {
        setError("Something went wrong while loading movie details.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [imdbID]);

  if (!imdbID) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {isLoading && <p className="modal-status">Loading movie details...</p>}

        {!isLoading && error && <p className="modal-status error">{error}</p>}

        {!isLoading && !error && movie && (
          <>
            <div className="modal-header">
              <div className="modal-title-block">
                <h2>{movie.Title}</h2>
                <span className="modal-subtitle">
                  {movie.Year} • {movie.Runtime} • {movie.Genre}
                </span>
              </div>
              <button className="modal-close" onClick={onClose}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-poster">
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                ) : (
                  <div className="filler-poster" />
                )}
              </div>

              <div className="modal-details">
                {movie.imdbRating && movie.imdbRating !== "N/A" && (
                  <div className="modal-rating">
                    <span className="rating-label">IMDb</span>
                    <span className="rating-value">{movie.imdbRating}</span>
                  </div>
                )}

                {movie.Plot && movie.Plot !== "N/A" && (
                  <p className="modal-plot">{movie.Plot}</p>
                )}

                <div className="modal-meta-grid">
                  {movie.Director && movie.Director !== "N/A" && (
                    <div>
                      <span className="meta-label">Director</span>
                      <span className="meta-value">{movie.Director}</span>
                    </div>
                  )}
                  {movie.Actors && movie.Actors !== "N/A" && (
                    <div>
                      <span className="meta-label">Cast</span>
                      <span className="meta-value">{movie.Actors}</span>
                    </div>
                  )}
                  {movie.Language && movie.Language !== "N/A" && (
                    <div>
                      <span className="meta-label">Language</span>
                      <span className="meta-value">{movie.Language}</span>
                    </div>
                  )}
                  {movie.Country && movie.Country !== "N/A" && (
                    <div>
                      <span className="meta-label">Country</span>
                      <span className="meta-value">{movie.Country}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailModal;


