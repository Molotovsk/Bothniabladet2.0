import { useState } from 'react';

export function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    onSearch(searchQuery);
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
      />
      <button onClick={handleSearch} className="px-4 py-1 bg-blue-500 text-white rounded">
        Search
      </button>
    </div>
  );
}
