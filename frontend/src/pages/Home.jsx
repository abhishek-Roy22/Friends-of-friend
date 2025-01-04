import React, { useState } from 'react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Search Term:', searchTerm);
    // Call backend API to search users
  };
  return (
    <div className="w-full p-10">
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search for friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-2/3 bg-transparent border-slate-400 font-bold caret-slate-400 text-slate-400"
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-6 py-2 bg-slate-600 text-white rounded hover:bg-slate-400"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
        <div className="flex flex-wrap items-center gap-5">
          <h2 className="text-lg font-bold mb-4">Friends List</h2>
          {/* Render friends list */}
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Friend Recommendations</h2>
          {/* Render friend recommendations */}
        </div>
      </div>
    </div>
  );
};

export default Home;
