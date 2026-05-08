import React, { useState, useEffect } from 'react';
import StoryCard from '../components/StoryCard';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Bookmarks = () => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      setError(null);
      const response = await api.get('/stories/bookmarks');
      setBookmarkedStories(response.data);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      setError(error.response?.data?.message || 'Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = (storyId) => {
    setBookmarkedStories(prev => prev.filter(story => story._id !== storyId));
  };

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

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <p className="text-red-700 mb-4">{error}</p>
          <button onClick={fetchBookmarks} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          📖 My Bookmarks
        </h1>
        <p className="text-gray-600">
          You have {bookmarkedStories.length} {bookmarkedStories.length === 1 ? 'story' : 'stories'} saved
        </p>
      </div>

      {bookmarkedStories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <div className="text-6xl mb-4">🔖</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookmarks yet</h3>
          <p className="text-gray-600 mb-6">Start bookmarking stories you like!</p>
          <button 
            onClick={() => window.location.href = '/'} 
            className="btn-primary"
          >
            Browse Stories
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedStories.map(story => (
            <StoryCard 
              key={story._id} 
              story={story} 
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;