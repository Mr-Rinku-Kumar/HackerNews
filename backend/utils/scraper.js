const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

async function scrapeHackerNews() {
  try {
    console.log('🔄 Starting scraper for top 10 stories...');
    const { data } = await axios.get('https://news.ycombinator.com/');
    const $ = cheerio.load(data);
    const stories = [];

    // Scrape exactly top 10 stories
    $('.athing').each((i, element) => {
      if (i >= 10) return false;
      
      const titleElement = $(element).find('.titleline > a').first();
      const title = titleElement.text().trim();
      let url = titleElement.attr('href');
      
      if (url && !url.startsWith('http')) {
        url = 'https://news.ycombinator.com/' + url;
      }
      
      const subtext = $(element).next();
      
      const pointsText = subtext.find('.score').text();
      let points = 0;
      if (pointsText) {
        points = parseInt(pointsText) || 0;
      }
      
      const author = subtext.find('.hnuser').text();
      
      let postedAt = new Date();
      const timeElement = subtext.find('.age');
      const postedAtText = timeElement.attr('title');
      
      if (postedAtText) {
        const parsedDate = new Date(postedAtText);
        if (!isNaN(parsedDate.getTime())) {
          postedAt = parsedDate;
        }
      }
      
      stories.push({
        title,
        url: url || '#',
        author: author || 'Anonymous',
        points: points,
        postedAt: postedAt
      });
    });
    
    console.log(`✅ Scraped ${stories.length} stories (Required: top 10)`);
    
    // Save to database - FIXED: Using updated Mongoose syntax
    let savedCount = 0;
    for (let story of stories) {
      try {
        // Updated: Use returnDocument instead of new
        const result = await Story.findOneAndUpdate(
          { title: story.title },
          { 
            $set: {
              url: story.url,
              author: story.author,
              points: story.points,
              postedAt: story.postedAt
            }
          },
          { 
            upsert: true, 
            returnDocument: 'after'  // This replaces 'new: true'
          }
        );
        savedCount++;
      } catch (err) {
        console.error(`Failed to save story "${story.title}":`, err.message);
      }
    }
    
    console.log(`💾 Saved ${savedCount} stories to database`);
    return savedCount;
    
  } catch (error) {
    console.error('❌ Scraping failed:', error.message);
    throw error;
  }
}

module.exports = { runScraper: scrapeHackerNews };