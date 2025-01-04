import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.get('auth/restore-session', {
          withCredentials: true,
        });
        if (res.status !== 200) {
          throw new Error('Invalid Route');
        }
        setUser(res.data);
      } catch (error) {
        console.error('Error restoring session:', error.message);
      }
    };

    restoreSession();
  }, []);

  const login = async (userName, password) => {
    try {
      const res = await axios.post('auth/login', {
        userName,
        password,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to login ${error.message}`);
    }
  };

  const signup = async (userName, email, password) => {
    try {
      const res = await axios.post('auth/register', {
        userName,
        email,
        password,
      });
      setUser(res.data);
    } catch (error) {
      console.log(error);
      throw new Error(`Unable to login ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      await axios.get('/auth/logout');
      setUser(null);
    } catch (error) {
      throw new Error('Unable to logout');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
