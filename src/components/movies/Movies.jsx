import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Movies = ({ title }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const watchmodeApiKey = 'wELWo199Jk3y3qxHHo7nqnBr6kKF1iO2ew0HHFDD';
  const omdbApiKey = '790abeb5';

  const getMovies = async () => {
    try {
      setLoading(true);

      let url = `https://api.watchmode.com/v1/list-titles/?apiKey=${watchmodeApiKey}&types=movie&limit=10`;
      const randomOffset = Math.floor(Math.random() * 50);
      url += `&offset=${randomOffset}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.titles) {
        console.error('No movies returned:', data);
        setMovies([]);
        setLoading(false);
        return;
      }

      const movieList = await Promise.all(
        data.titles.map(async (movie) => {
          try {
            if (!movie.imdb_id) return null;

            const omdbRes = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${movie.imdb_id}`);
            const omdbData = await omdbRes.json();

            const detailsRes = await fetch(`https://api.watchmode.com/v1/title/${movie.id}/details/?apiKey=${watchmodeApiKey}`);
            const detailsData = await detailsRes.json();

            if (!detailsData.trailer) return null;

            return {
              name: omdbData.Title,
              image: omdbData.Poster,
              year: omdbData.Year,
              rating: omdbData.imdbRating,
              trailerUrl: detailsData.trailer,
            };
          } catch (error) {
            console.error('Error fetching movie details:', error);
            return null;
          }
        })
      );

      setMovies(movieList.filter((movie) => movie !== null));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [title]);

  return (
    <div>
      <h3 className="heading">
        {title || 'Trending Movies'}
      </h3>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="main">
          {movies.map((card, ind) => {
            const videoId = card.trailerUrl?.split('v=')[1]?.split('&')[0];

            return (
              <div key={ind} className="cards">
                <img
                  src={card.image !== 'N/A' ? card.image : '/placeholder.jpg'}
                  alt={card.name}
                />
                <div className="card-content">
                  <p><strong>{card.name}</strong></p>
                  <p>{card.year} | IMDb: {card.rating}</p>
                </div>

                <div
                  className="trailer-button"
                  onClick={() => navigate(`/trailer/${videoId}`)}
                >
                  Watch Trailer
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Movies;
