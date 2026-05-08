import React, { useState, useEffect, useCallback } from 'react';
import StoryCard from '../components/StoryCard';
import api from '../utils/api';

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [scraping, setScraping] = useState(false);

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
    setScraping(true);
    try {
      await api.post('/scrape');
      setPage(1); // Reset to first page
      setTimeout(() => {
        fetchStories();
        alert('✅ Stories scraped successfully!');
      }, 2000);
    } catch (error) {
      alert('❌ Failed to trigger scrape');
      console.error(error);
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Hacker News Stories
        </h1>
        <button
          onClick={triggerScrape}
          disabled={scraping}
          className="btn-primary flex items-center space-x-2"
        >
          {scraping ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Scraping...</span>
            </>
          ) : (
            <>
              <span>🔄</span>
              <span>Scrape Latest</span>
            </>
          )}
        </button>
      </div>

      {loading && page === 1 ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hn-orange"></div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {stories.map((story) => (
              <StoryCard 
                key={story._id} 
                story={story} 
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPage(p => p + 1)}
                disabled={loading}
                className="btn-secondary px-6 py-2"
              >
                {loading ? 'Loading...' : 'Load More Stories'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;