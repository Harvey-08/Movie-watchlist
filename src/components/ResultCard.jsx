import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const ResultCard = ({ movie }) => {
  const {
    addMovieToWatchlist,
    watchlist,
    watched,
    addMovieToWatched
  } = useContext(GlobalContext);

  let storedMovie = watchlist.find(o => o.imdbID === movie.imdbID);
  let storedMovieWatched = watched.find(o => o.imdbID === movie.imdbID);

  const watchlistDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisabled = storedMovieWatched ? true : false;

  return (
    <div className="bg-[#0f0d23] p-5 rounded-2xl shadow-inner shadow-[#cecefb]/10 flex flex-col h-full">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : '/no-movie.png'}
        alt={movie.Title}
        className="rounded-lg h-auto w-full object-cover aspect-[2/3]"
      />
      <div className="mt-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-white font-bold text-base line-clamp-1">{movie.Title}</h3>
          <div className="mt-2 flex flex-row items-center flex-wrap gap-2">
            <div className="flex flex-row items-center gap-1">
              <img src="/star.svg" alt="Star icon" className="size-4 object-contain" />
              <p className="font-bold text-base text-white">{movie.imdbRating || "N/A"}</p>
            </div>
            <span className="text-sm text-[#9ca4ab]">•</span>
            <p className="capitalize text-[#9ca4ab] font-medium text-base">{movie.Type || "Movie"}</p>
            <span className="text-sm text-[#9ca4ab]">•</span>
            <p className="text-[#9ca4ab] font-medium text-base">{movie.Year ? movie.Year.substring(0, 4) : "-"}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-5">
          <button
            className="w-full py-2 bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] text-[#022c35] rounded-lg font-bold text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
            onClick={() => addMovieToWatchlist(movie)}
            disabled={watchlistDisabled}
          >
            {watchlistDisabled ? "In Watchlist" : "Add to Watchlist"}
          </button>

          <button
            className="w-full py-2 bg-[rgba(255,255,255,0.08)] text-white rounded-lg font-bold text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(255,255,255,0.15)] transition-colors"
            onClick={() => addMovieToWatched(movie)}
            disabled={watchedDisabled}
          >
            {watchedDisabled ? "Watched" : "Add to Watched"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
