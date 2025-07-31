import { createContext, useState, useEffect } from 'react';

export const WatchlistContext = createContext();


export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.name === movie.name)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (name) => {
    setWatchlist(watchlist.filter((m) => m.name !== name));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
