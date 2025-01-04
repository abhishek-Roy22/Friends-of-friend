import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FriendCard from '../components/FriendCard';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState(null);

  const fetchFriendList = async () => {
    try {
      const res = await axios.get('friends/friends');
      setFriends(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchFriendList();
  }, []);

  const handleSearch = () => {
    console.log(searchTerm);
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
      <div className="w-full flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-5 p-4">
          <h2 className="text-xl text-slate-400 font-bold mb-4">
            Friends List
          </h2>
          <div className="w-full flex items-center gap-5 flex-wrap">
            {friends?.map((friend) => (
              <FriendCard key={friend._id} {...friend} />
            ))}
          </div>
        </div>
        <div className="w-80 flex">
          <h2 className="text-xl text-slate-400 font-bold mb-4">
            Friend Recommendations
          </h2>
          {/* Render friend recommendations */}
        </div>
      </div>
    </div>
  );
};

export default Home;
