import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FriendCard from '../components/FriendCard';
import SearchFriendCard from '../components/SearchFriendCard';
import FriendRequestedCard from '../components/FriendRequestedCard';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState([]);
  const [searchFriends, setSearchFriends] = useState([]);
  const [requestedFriends, setRequestedFriends] = useState([]);

  const fetchFriendList = async () => {
    setLoading(true);
    {
      loading && toast.loading('Loading...');
    }
    try {
      const res = await axios.get('friends/friends');
      setFriends(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      toast.error('Please retry!');
    }
  };

  const fetchRequestedFriend = async () => {
    setLoading(true);
    try {
      const res = await axios.get('friends/friend-requests');
      setRequestedFriends(res.data);
    } catch (error) {
      console.log(error.message);
      toast.error('Unable to find friend.');
    }
  };

  useEffect(() => {
    fetchFriendList();
    fetchRequestedFriend();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setSearchFriends([]);
      return;
    }

    const searchFriend = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`friends/search?query=${searchTerm}`);
        setSearchFriends(res.data);
      } catch (error) {
        console.log(error.message);
        toast.error('User not found.');
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      searchFriend();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="w-full p-2 md:p-10">
      <div className="flex flex-col justify-center md:flex-row gap-10 w-full mb-6">
        <input
          type="search"
          placeholder="Search for friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full md:w-2/3 bg-transparent border-slate-400 font-bold caret-slate-400 text-slate-400"
        />
        <button className=" px-6 py-2 bg-slate-600 text-white rounded hover:bg-slate-400">
          Search
        </button>
      </div>
      <div className="w-full flex flex-wrap gap-5 ">
        {requestedFriends?.map((friend) => (
          <FriendRequestedCard key={friend.id} {...friend.sender} />
        ))}
      </div>
      <div className="w-full flex flex-wrap gap-5 justify-center">
        {searchFriends?.map((friend) => (
          <SearchFriendCard key={friend._id} {...friend} />
        ))}
      </div>
      <div className="w-full flex flex-col justify-center md:flex-row gap-10">
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
        {/* <div className="w-80 flex">
          <h2 className="text-xl text-slate-400 font-bold mb-4">
            Friend Recommendations
          </h2>
          
        </div> */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Home;
