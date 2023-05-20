import React, { useState } from 'react';

function SearchBar({ handleSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    console.log('Search input:', value); // Log the input value
  };

  const handleButtonClick = () => {
    handleSearch(query);
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="Sök efter bilder här..."
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        value={query}
        onChange={handleInputChange}
      />
      <button
        className="px-4 py-2 ml-2 text-white bg-myColor-700 rounded-full hover:bg-myColor-300 focus:outline-none"
        onClick={handleButtonClick}
      >
        Sök
      </button>
    </div>
  );
}
