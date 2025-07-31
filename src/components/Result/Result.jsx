// src/components/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const WATCHMODE_KEY = 'wELWo199Jk3y3qxHHo7nqnBr6kKF1iO2ew0HHFDD';
const OMDB_KEY = '790abeb5';

export default function Result() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      setLoading(true);

      try {
        // 1️⃣ Autocomplete search from Watchmode (movies only)
        const res = await fetch(
          `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${WATCHMODE_KEY}&search_value=${encodeURIComponent(query)}&search_type=3`
        );
        const json = await res.json();
        if (!json.results || json.results.length === 0) {
          setMovies([]);
          setLoading(false);
          return;
        }

        // 2️⃣ For each Watchmode result, fetch trailer and OMDB details
        const data = await Promise.all(
          json.results.slice(0, 10).map(async (item) => {
            try {
              // Fetch Watchmode details to get trailer URL
              const detRes = await fetch(
                `https://api.watchmode.com/v1/title/${item.id}/details/?apiKey=${WATCHMODE_KEY}`
              );
              const detJson = await detRes.json();
              if (!detJson.trailer) return null;

              // Fetch OMDB data for poster and year
              const omdbRes = await fetch(
                `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${item.imdb_id}`
              );
              const omdbJson = await omdbRes.json();

              return {
                name: item.name || omdbJson.Title,
                poster: omdbJson.Poster,
                year: omdbJson.Year,
                trailerUrl: detJson.trailer,
              };
            } catch {
              return null;
            }
          })
        );

        setMovies(data.filter(Boolean));
      } catch (err) {
        console.error('Search error:', err);
        setMovies([]);
      }

      setLoading(false);
    };

    fetchSearch();
  }, [query]);

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">
        Results for “{query}”
      </h2>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((m, i) => {
            const videoId = m.trailerUrl.split('v=')[1]?.split('&')[0] || '';
            return (
              <div
                key={i}
                className="cursor-pointer bg-gray-900 rounded overflow-hidden"
                onClick={() => navigate(`/trailer/${videoId}`)}
              >
                <img
                  src={m.poster}
                  alt={m.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-2 text-center text-sm">
                  {m.name} ({m.year})
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
