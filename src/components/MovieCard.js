import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="movie-info">
        <h2>
          {movie.title} ({new Date(movie.release_date).getFullYear()})
        </h2>
        <div className="movie-genres">
          {movie.genre_names.map((genre) => (
            <span key={genre} className="genre-tag">
              {genre}
            </span>
          ))}
        </div>
        <div className="movie-rating">
          <span className="star">⭐</span>
          <span>{movie.vote_average.toFixed(1)}/10</span>
          <span className="vote-count">({movie.vote_count} votes)</span>
        </div>
        <p className="movie-overview">{movie.overview}</p>

        {/* Links */}
        <iframe
          className="movie-links"
          width="460"
          height="280"
          src={`https://www.youtube.com/embed/${movie.trailer}`}
          title="YouTube trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieCard;
