const express = require('express');
const { 
  getAllStories, 
  getStoryById, 
  toggleBookmark,
  getUserBookmarks  // Add this
} = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllStories);
router.get('/bookmarks', protect, getUserBookmarks); // Add this line - specific route first
router.get('/:id', getStoryById);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;