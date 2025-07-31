import React, { useState } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { createSearchParams, useNavigate } from 'react-router-dom';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate({
      pathname: '/search',
      search: createSearchParams({ q: trimmed }).toString(),
    });
  };
  const handleClear = () => {
    setQuery('');
    onSearch(''); // clear search results if needed
  };


  return (
    <form onSubmit={handleSubmit} className="search-form">
      <IoMdSearch className="search-icon" size={20} />
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="search-input"
      />
    
    </form>
  );
}
