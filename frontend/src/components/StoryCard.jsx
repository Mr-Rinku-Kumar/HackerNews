import React from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const StoryCard = ({ story, onBookmarkToggle }) => {
  const { user } = useAuth();
  const isBookmarked = user && story.bookmarkedBy?.includes(user.id);

  const handleBookmark = async () => {
    if (!user) {
      alert('Please login to bookmark stories');
      return;
    }
    try {
      await api.post(`/stories/${story._id}/bookmark`);
      onBookmarkToggle(story._id);
    } catch (error) {
      console.error('Bookmark failed:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardContent}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            <a href={story.url} target="_blank" rel="noopener noreferrer" style={styles.link}>
              {story.title}
            </a>
          </h3>
          <button onClick={handleBookmark} style={styles.bookmarkBtn}>
            {isBookmarked ? '🔖 Bookmarked' : '📖 Bookmark'}
          </button>
        </div>
        <div style={styles.details}>
          <span>⭐ {story.points} points</span>
          <span>✍️ by {story.author}</span>
          <span>📅 {formatDate(story.postedAt)}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    marginBottom: '16px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cardContent: {
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '12px',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    flex: 1,
  },
  link: {
    color: '#0066cc',
    textDecoration: 'none',
  },
  bookmarkBtn: {
    padding: '8px 16px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '16px',
  },
  details: {
    display: 'flex',
    gap: '20px',
    fontSize: '14px',
    color: '#666',
  },
};

export default StoryCard;