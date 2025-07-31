import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WatchlistContext } from '../WatchlistContext/WatchlistContext';

const Watchlists = () => {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);

  return (
    <div>
      <h3 className="heading">
        Your Watchlist
      </h3>

      {watchlist.length === 0 ? (
        <div style={{ color: 'white', padding: '1rem' }}>
          No movies in watchlist.
        </div>
      ) : (
        <div className="main">
          {watchlist.map((card, ind) => {
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
                  
                  onClick={() => removeFromWatchlist(card.name)}
                >
                  Remove
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Watchlists;
