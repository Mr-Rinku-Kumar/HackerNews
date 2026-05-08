import React, { useState, useEffect } from 'react';
import StoryCard from '../components/StoryCard';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/stories/user/bookmarks');
      setBookmarks(response.data);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      if (error.response?.status === 401) {
        // Auto logout will happen via interceptor
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hn-orange"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
        <p className="text-gray-600">You need to be logged in to view your bookmarks</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔖</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Bookmarks Yet</h2>
        <p className="text-gray-600">Start bookmarking stories from the home page!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookmarks</h1>
      <div className="space-y-4">
        {bookmarks.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;