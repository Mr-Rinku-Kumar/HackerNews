const { runScraper, scrapeMultiplePages } = require('../utils/scraper');

exports.triggerScrape = async (req, res) => {
  try {
    // Get parameter for number of pages (default: 1)
    const pages = parseInt(req.query.pages) || 1;
    
    let storyCount;
    if (pages > 1) {
      storyCount = await scrapeMultiplePages(pages);
    } else {
      storyCount = await runScraper();
    }
    
    res.json({ 
      message: `Scraping completed successfully`,
      storiesScraped: storyCount,
      pagesScraped: pages
    });
  } catch (error) {
    console.error('Scrape trigger error:', error);
    res.status(500).json({ 
      message: 'Scraping failed', 
      error: error.message 
    });
  }
};