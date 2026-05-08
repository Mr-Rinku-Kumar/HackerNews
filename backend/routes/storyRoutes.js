const express = require('express');
const { 
  getAllStories, 
  getStoryById, 
  toggleBookmark,
  getUserBookmarks
} = require('../controllers/storyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllStories);
router.get('/:id', getStoryById);

// Protected routes
router.get('/user/bookmarks', protect, getUserBookmarks);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;