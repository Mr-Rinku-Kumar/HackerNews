import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const StoryCard = ({ story, onBookmarkToggle }) => {
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && story.bookmarkedBy) {
      const userId = user._id || user.id;
      const bookmarked = story.bookmarkedBy.includes(userId);
      setIsBookmarked(bookmarked);
    }
  }, [user, story]);

  const handleBookmark = async () => {
    if (!user) {
      alert('Please login to bookmark stories');
      return;
    }
    
    setLoading(true);
    try {
      await api.post(`/stories/${story._id}/bookmark`);
      setIsBookmarked(!isBookmarked);
      if (onBookmarkToggle) {
        onBookmarkToggle(story._id);
      }
    } catch (error) {
      console.error('Bookmark failed:', error);
      alert('Failed to toggle bookmark. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    const now = new Date();
    const posted = new Date(date);
    const diffHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} days ago`;
  };

  return (
    <div className="card hover:shadow-lg transition-all duration-200">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
          <h3 className="text-lg sm:text-xl font-semibold flex-1">
            <a 
              href={story.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-800 hover:text-hn-orange transition-colors"
            >
              {story.title}
            </a>
          </h3>
          <button
            onClick={handleBookmark}
            disabled={loading}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200
              ${isBookmarked 
                ? 'bg-hn-orange hover:bg-orange-600 cursor-pointer' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
              }
              ${loading ? 'opacity-50 cursor-not-allowed' : ''}
              w-full sm:w-auto
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
              </span>
            )}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center">
            <span className="mr-1">⭐</span> {story.points || 0} points
          </span>
          <span className="flex items-center">
            <span className="mr-1">✍️</span> by {story.author || 'Anonymous'}
          </span>
          <span className="flex items-center">
            <span className="mr-1">📅</span> {formatDate(story.postedAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;