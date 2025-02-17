import { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import "./MovieRandomizer.css";
const MovieRandomizer = () => {
  const MAX_RETRIES = 5;
  const defaultFilters = {
    genre: 28, // Default: Action (ID 28)
    startYear: 2010,
    endYear: 2020,
  };

  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const historyRef = useRef([]); // For access in async functions

  //Reset history when filters changed
  useEffect(() => {
    historyRef.current = [];
  }, [filters]);

  // Get genre list on mount
  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const data = await res.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  const fetchRandomMovie = async (retryCount = 0) => {
    let parsedRetry = Number.parseInt(retryCount);
    console.log(parsedRetry);
    if (retryCount >= MAX_RETRIES) {
      setError(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      const startDate = `${filters.startYear}-01-01`;
      const endDate = `${filters.endYear}-12-31`;

      // Is total more then 2?
      const initialRes = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&` +
          `with_genres=${filters.genre}&` +
          `primary_release_date.gte=${startDate}&` +
          `primary_release_date.lte=${endDate}&` +
          `sort_by=popularity.desc&` +
          "vote_average.gte=7&" +
          `vote_count.gte=100&`
      );

      const initialData = await initialRes.json();
      const bestPage =
        Math.floor(Math.random() * Math.min(initialData.total_pages, 2)) + 1;

      // Fetch random page
      const pageRes = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&` +
          `with_genres=${filters.genre}&` +
          `primary_release_date.gte=${startDate}&` +
          `primary_release_date.lte=${endDate}&` +
          `sort_by=popularity.desc&` +
          "vote_average.gte=7&" +
          `vote_count.gte=100&` +
          `page=${bestPage}`
      );
      const pageData = await pageRes.json();
      console.log("Random page data:", pageData);

      // Get random movie from page
      const randomMovie =
        pageData.results[Math.floor(Math.random() * pageData.results.length)];
      console.log("Random movie info", randomMovie);

      // Check duplicates
      if (historyRef.current.includes(randomMovie.id)) {
        return fetchRandomMovie(retryCount + 1);
      }

      // Get full details (optional)
      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${randomMovie.id}?api_key=${process.env.REACT_APP_TMDB_KEY}&append_to_response=videos`
      );
      const details = await detailsRes.json();

      const trailers = details.videos?.results?.filter(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      const trailerKey = trailers?.[0]?.key;

      const fullMovie = {
        ...randomMovie,
        ...details,
        genre_names: details.genres.map((g) => g.name),
        trailer: trailerKey,
      };

      setMovie(fullMovie);

      // Update history
      historyRef.current = [...historyRef.current, randomMovie.id];
      setError(false);
    } catch (err) {
      console.error("Failed to fetch movie:", err);
      alert("No movies found matching criteria!");
    } finally {
      setIsLoading(false);
    }
  };
  const content = error ? (
    "Sorry, no films to offer, try another filters"
  ) : (
    <MovieCard movie={movie} />
  );
  return (
    <div className="movie-randomizer">
      <div className="filters">
        <label htmlFor="years" className="labels">
          Genre
        </label>
        <select
          id="years"
          value={filters.genre}
          onChange={(e) =>
            setFilters({ ...filters, genre: Number.parseInt(e.target.value) })
          }
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <label htmlFor="years" className="labels">
          Year from
        </label>
        <input
          type="number"
          value={filters.startYear}
          onChange={(e) =>
            setFilters({
              ...filters,
              startYear: Number.parseInt(e.target.value),
            })
          }
          placeholder="Start Year"
        />
        <label htmlFor="years" className="labels">
          To
        </label>
        <input
          type="number"
          value={filters.endYear}
          onChange={(e) =>
            setFilters({ ...filters, endYear: Number.parseInt(e.target.value) })
          }
          placeholder="End Year"
        />
      </div>
      <button onClick={fetchRandomMovie} disabled={isLoading}>
        {isLoading ? "Rolling..." : "Get movie"}
      </button>
      {movie && content}
    </div>
  );
};

export default MovieRandomizer;
