const Story = require('../models/Story');

// GET /api/stories?page=1&limit=10
exports.getAllStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default 10 per page
    const skip = (page - 1) * limit;

    const stories = await Story.find()
      .sort({ points: -1 }) // Sort by points descending
      .skip(skip)
      .limit(limit);

    const total = await Story.countDocuments();

    res.json({
      stories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalStories: total
    });
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/stories/:id
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/stories/:id/bookmark
exports.toggleBookmark = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const userId = req.user.id;
    const isBookmarked = story.bookmarkedBy.includes(userId);

    if (isBookmarked) {
      story.bookmarkedBy = story.bookmarkedBy.filter(
        id => id.toString() !== userId
      );
      await story.save();
      res.json({ message: 'Bookmark removed', bookmarked: false });
    } else {
      story.bookmarkedBy.push(userId);
      await story.save();
      res.json({ message: 'Bookmark added', bookmarked: true });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's bookmarked stories
exports.getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const stories = await Story.find({
      bookmarkedBy: userId
    }).sort({ points: -1 });
    
    res.json(stories);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};