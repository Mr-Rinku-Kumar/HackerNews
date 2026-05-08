import React, { useState, useEffect } from 'react';
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
        setStories(response.data.stories);
      } else {
        setStories(prev => [...prev, ...response.data.stories]);
      }
      
      setHasMore(page < response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerScrape = async () => {
    setScraping(true);
    try {
      await api.post('/scrape');
      alert('✅ Scraping completed! Refreshing stories...');
      setPage(1);
      setTimeout(() => fetchStories(), 1000);
    } catch (error) {
      alert('❌ Failed to trigger scrape');
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Top 10 Hacker News Stories
        </h1>
        <button
          onClick={triggerScrape}
          disabled={scraping}
          className="bg-hn-orange px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          {scraping ? 'Scraping...' : '🔄 Scrape Latest'}
        </button>
      </div>

      {loading && page === 1 ? (
        <div className="text-center py-20">Loading stories...</div>
      ) : (
        <>
          <div className="space-y-4">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPage(p => p + 1)}
                className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;