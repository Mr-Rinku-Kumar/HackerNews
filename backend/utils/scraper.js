const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

async function scrapeHackerNews() {
    try {
        const { data } = await axios.get('https://news.ycombinator.com/');
        const $ = cheerio.load(data);
        const stories = [];

        $('.athing').each((i, el) => {
            if (i >= 10) return false;

            const title = $(el).find('.titleline > a').first().text();
            const url = $(el).find('.titleline > a').first().attr('href');
            const author = $(el).next().find('.hnuser').text();
            const points = parseInt($(el).next().find('.score').text()) || 0;
            const postedAt = new Date();

            stories.push({ title, url, author, points, postedAt });
        });

        for (let story of stories) {
            await Story.findOneAndUpdate(
                { title: story.title },
                story,
                { upsert: true, returnDocument: 'after' }
            );
        }
        console.log('Scraping completed');
    } catch (error) {
        console.error('Scraping failed:', error);
    }
}

module.exports = { runScraper: scrapeHackerNews };