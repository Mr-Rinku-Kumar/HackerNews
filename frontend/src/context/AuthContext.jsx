import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on page refresh
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        // Parse user data
        const parsedUser = JSON.parse(userData);
        
        // Set authorization header for all future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Verify token is valid (optional: make a test API call)
        setUser({ 
          token, 
          ...parsedUser 
        });
      } catch (error) {
        console.error('Error restoring user session:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, _id, name, email: userEmail } = response.data;
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify({ _id, name, email: userEmail }));
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser({ token, _id, name, email: userEmail });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      const { token, _id, name: userName, email: userEmail } = response.data;
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify({ _id, name: userName, email: userEmail }));
      
      // Set authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser({ token, _id, name: userName, email: userEmail });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};