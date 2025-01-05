import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const useFetch = (url) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  if (user) {
    useEffect(() => {
      const fetchFriendList = async () => {
        try {
          const res = await axios.get(url);
          setFriends(res.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchFriendList();
    }, [url]);
  }

  return { friends, loading, error };
};

export default useFetch;
