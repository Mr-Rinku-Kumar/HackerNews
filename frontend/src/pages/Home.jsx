import React, { useState, useEffect } from 'react';
import StoryCard from '../components/StoryCard';
import api from '../utils/api';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchStories();
  }, [page]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/stories?page=${page}&limit=10`);
      if (page === 1) {
        setStories(response.data);
      } else {
        setStories(prev => [...prev, ...response.data]);
      }
      setHasMore(response.data.length === 10);
    } catch (error) {
      console.error('Failed to fetch stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkToggle = (storyId) => {
    setStories(stories.map(story => 
      story._id === storyId 
        ? { ...story, bookmarked: !story.bookmarked }
        : story
    ));
  };

  const triggerScrape = async () => {
    try {
      await api.post('/scrape');
      alert('Scraping started! Refresh in a moment.');
      setTimeout(() => fetchStories(), 3000);
    } catch (error) {
      alert('Failed to trigger scrape');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Hacker News Stories</h1>
        <button onClick={triggerScrape} style={styles.scrapeBtn}>
          🔄 Scrape Latest Stories
        </button>
      </div>
      
      {loading && page === 1 ? (
        <div style={styles.loading}>Loading stories...</div>
      ) : (
        <>
          {stories.map(story => (
            <StoryCard 
              key={story._id} 
              story={story} 
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
          
          {hasMore && (
            <div style={styles.loadMoreContainer}>
              <button 
                onClick={() => setPage(p => p + 1)} 
                style={styles.loadMoreBtn}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  scrapeBtn: {
    padding: '10px 20px',
    backgroundColor: '#ff6600',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666',
  },
  loadMoreContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  loadMoreBtn: {
    padding: '10px 20px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Home;