import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TVShows = ({ title }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  const watchmodeApiKey = '5CC5lyZABxojgO6g3Et3HNMdA1uNZXysjwi2qd6M';
  const omdbApiKey = '790abeb5';

  const getTVShows = async () => {
    try {
      setLoading(true); // Start loading

      let url = `https://api.watchmode.com/v1/list-titles/?apiKey=${watchmodeApiKey}&types=tv_series&limit=10`;
      const randomOffset = Math.floor(Math.random() * 50);
      url += `&offset=${randomOffset}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.titles) {
        console.error('No TV shows returned:', data);
        setShows([]);
        setLoading(false);
        return;
      }

      const showList = await Promise.all(
        data.titles.map(async (show) => {
          try {
            if (!show.imdb_id) return null;

            const omdbRes = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${show.imdb_id}`);
            const omdbData = await omdbRes.json();

            const detailsRes = await fetch(`https://api.watchmode.com/v1/title/${show.id}/details/?apiKey=${watchmodeApiKey}`);
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
            console.error('Error fetching show details:', error);
            return null;
          }
        })
      );

      setShows(showList.filter((show) => show !== null));
      setLoading(false); // End loading
    } catch (err) {
      console.error('Error fetching TV shows:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
   getTVShows();
  }, [title]);

  return (
    <div>
      <h3 className="heading">
        {title || 'Trending TV Shows'}
      </h3>

      {loading ? (
        <div className="spinner"></div> // Show spinner while loading
      ) : (
        <div className="main">
          {shows.map((card, ind) => {
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
                  className="watchs"
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

export default TVShows;
