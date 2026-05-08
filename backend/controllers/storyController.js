const Story = require('../models/Story');

exports.getAllStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const stories = await Story.find()
      .sort({ points: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v'); // Exclude version field

    console.log(`Sending ${stories.length} stories`); // Debug log
    
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).select('-__v');
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    console.error('Error fetching story:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleBookmark = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    const userId = req.user.id;
    const isBookmarked = story.bookmarkedBy.includes(userId);

    if (isBookmarked) {
      // Remove bookmark
      story.bookmarkedBy = story.bookmarkedBy.filter(
        id => id.toString() !== userId
      );
      await story.save();
      console.log(`Bookmark removed for user ${userId} from story ${story._id}`);
      res.json({ 
        message: 'Bookmark removed', 
        isBookmarked: false,
        storyId: story._id 
      });
    } else {
      // Add bookmark
      story.bookmarkedBy.push(userId);
      await story.save();
      console.log(`Bookmark added for user ${userId} to story ${story._id}`);
      res.json({ 
        message: 'Bookmark added', 
        isBookmarked: true,
        storyId: story._id 
      });
    }
  } catch (error) {
    console.error('Error toggling bookmark:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add this new endpoint to get user's bookmarked stories
exports.getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const stories = await Story.find({
      bookmarkedBy: userId
    }).sort({ points: -1 });
    
    console.log(`Found ${stories.length} bookmarked stories for user ${userId}`);
    res.json(stories);
  } catch (error) {
    console.error('Error fetching user bookmarks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};