import React, { useState, useEffect, useRef } from "react";
import ResultCard from "./ResultCard";

const API_KEY = import.meta.env.VITE_OMDB_KEY;

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceTimeout = useRef(null);

  const defaultMovies = [
    "Inception",
    "The Dark Knight",
    "Pulp Fiction",
    "The Godfather"
  ];

  const fetchMovies = async (searchTerm) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          searchTerm
        )}&type=movie`
      );
      const data = await response.json();
      if (data.Response === "True" && Array.isArray(data.Search)) {
        setResults(data.Search.slice(0, 8));
      } else {
        setResults([]);
        setError(data.Error || "No results found.");
      }
    } catch (err) {
      setResults([]);
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDefaultMovies = async () => {
    setIsLoading(true);
    setError("");
    try {
      const moviePromises = defaultMovies.map(async (title) => {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(
            title
          )}`
        );
        const data = await response.json();
        return data.Response === "True" ? data : null;
      });
      const res = await Promise.all(moviePromises);
      setResults(res.filter((movie) => movie !== null));
    } catch (err) {
      setError("Failed to load default movies.");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (query.trim().length === 0) {
      fetchDefaultMovies();
      return;
    }

    if (query.trim().length < 3) {
      setResults([]);
      setError("Please enter at least 3 characters to search.");
      return;
    }

    debounceTimeout.current = setTimeout(() => {
      fetchMovies(query.trim());
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query]);

  return (
    <>
      <div className="mx-auto mt-10 w-full max-w-3xl rounded-lg bg-[#cecefb]/5 px-4 py-3">
        <div className="relative flex items-center">
          <svg className="absolute left-2 h-5 w-5 text-[#a8b5db]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search through thousands of movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent py-2 pl-10 pr-4 text-base text-[#a8b5db] placeholder-[#a8b5db] outline-none"
          />
        </div>
      </div>

      <section className="mt-12 space-y-9">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {query.trim() ? "Search Results" : "Featured Movies"}
        </h2>

        {isLoading && <p className="text-center text-[#a0aec0]">Searching movies...</p>}

        {!isLoading && error && (
          <p className="text-center text-[#a855f7]">{error}</p>
        )}

        {!isLoading && !error && results.length > 0 && (
          <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-10">
            {results.map((movie) => (
              <li key={movie.imdbID}>
                <ResultCard movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default MovieSearch;
