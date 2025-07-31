// src/Titlecards/TitleCards.jsx

import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WatchlistContext } from '../components/WatchlistContext/WatchlistContext';

const genreMap = {
  Action: 17,
  Drama: 3,
  Comedy: 11,
  Horror: 16,
  Thriller: 9,
  Romance: 14,
  'Popular On CineStack': null,
  Blockbuster: null,
  'Favorites for You': null,
};

const TitleCards = ({ title }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { addToWatchlist } = useContext(WatchlistContext);
  const watchmodeApiKey = '5CC5lyZABxojgO6g3Et3HNMdA1uNZXysjwi2qd6M';
  const omdbApiKey = '790abeb5';
  const debounceTimeout = useRef(null);

  // ✅ Scroll refs and logic inside the component
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);

  const startAutoScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    clearInterval(scrollInterval.current);

    scrollInterval.current = setInterval(() => {
      container.scrollLeft += 2;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        clearInterval(scrollInterval.current);
      }
    }, 10);
  };

  const stopAutoScroll = () => {
    clearInterval(scrollInterval.current);
  };

  const getMovies = async () => {
    try {
      const genreId = genreMap[title] || null;
      let url = `https://api.watchmode.com/v1/list-titles/?apiKey=${watchmodeApiKey}&types=movie&limit=10`;

      if (genreId) {
        url += `&genres=${genreId}`;
      } else {
        const randomOffset = Math.floor(Math.random() * 50);
        url += `&offset=${randomOffset}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (!data.titles) {
        console.error('No titles returned:', data);
        setMovies([]);
        return;
      }

      const movieList = await Promise.all(
        data.titles.map(async (movie) => {
          try {
            const [omdbRes, detailsRes] = await Promise.all([
              fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&i=${movie.imdb_id}`),
              fetch(`https://api.watchmode.com/v1/title/${movie.id}/details/?apiKey=${watchmodeApiKey}`),
            ]);

            const omdbData = await omdbRes.json();
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
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(getMovies, 800);
    return () => clearTimeout(debounceTimeout.current);
  }, [title]);

  return (
    <div className="title myt px-6 py-10 bg-black text-white">
      <h3 className="head text-2xl font-bold mb-6">
        {title || 'Popular On CineStack'}
      </h3>

      <div className="group relative">
        <div
          ref={scrollRef}
          onMouseEnter={startAutoScroll}
          onMouseLeave={stopAutoScroll}
          className="wrapper cardlist flex card gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        >
          {movies.map((card, ind) => {
            const videoId = card.trailerUrl?.split('v=')[1]?.split('&')[0];
            return (
              <div
                key={ind}
                className="cardsx group/card min-w-[200px] max-w-[200px] mr-4 flex-shrink-0 border border-gray-700 rounded-lg overflow-hidden hover:border-red-500 hover:shadow-xl hover:scale-105 transition-transform duration-300 relative z-0 hover:z-10"
              >
                <img
                  src={card.image !== 'N/A' ? card.image : '/placeholder.jpg'}
                  alt={card.name}
                  className="move w-full h-48 object-cover"
                />
                <div className="p-2">
                  <p className="text-sm font-medium">{card.name}</p>
                  <p className="text-xs text-gray-400">
                    {card.year} | IMDb: {card.rating}
                  </p>
                </div>

                <button
                  onClick={() => addToWatchlist(card)}
                  className="watch2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm transition-colors shadow-md opacity-0 group-hover/card:opacity-100 absolute top-2 left-2"
                >
                  + Watchlist
                </button>

                <button
                  onClick={() => navigate(`/trailer/${videoId}`)}
                  className="watch absolute bottom-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors opacity-0 group-hover/card:opacity-100"
                >
                  Watch Trailer
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TitleCards;
