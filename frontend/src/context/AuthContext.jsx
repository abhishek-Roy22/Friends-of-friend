import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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

  const logout = () => {
    // Implement logout logic here
    // For example, you can clear the user state
    setUser(null);
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
