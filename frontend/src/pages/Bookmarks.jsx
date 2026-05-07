import React, { useState, useEffect } from 'react';
import StoryCard from '../components/StoryCard';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Bookmarks = () => {
  const [bookmarkedStories, setBookmarkedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    }
  }, [user]);

  const fetchBookmarks = async () => {
    try {
      const response = await api.get('/stories');
      const bookmarked = response.data.filter(story => 
        story.bookmarkedBy?.includes(user.id)
      );
      setBookmarkedStories(bookmarked);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = (storyId) => {
    setBookmarkedStories(prev => prev.filter(story => story._id !== storyId));
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.message}>
          <h2>Please login to view your bookmarks</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>My Bookmarks</h1>
      {loading ? (
        <div style={styles.loading}>Loading bookmarks...</div>
      ) : bookmarkedStories.length === 0 ? (
        <div style={styles.message}>
          <p>No bookmarked stories yet. Start bookmarking!</p>
        </div>
      ) : (
        bookmarkedStories.map(story => (
          <StoryCard 
            key={story._id} 
            story={story} 
            onBookmarkToggle={handleBookmarkToggle}
          />
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666',
  },
  message: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    color: '#666',
  },
};

export default Bookmarks;