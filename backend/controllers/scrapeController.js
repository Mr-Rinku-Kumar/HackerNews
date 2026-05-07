const { runScraper } = require('../utils/scraper');

exports.triggerScrape = async (req, res) => {
  await runScraper();
  res.json({ message: 'Scraping triggered successfully' });
};