const Story = require('../models/Story');

exports.getAllStories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const stories = await Story.find()
    .sort({ points: -1 })
    .skip(skip)
    .limit(limit);

  res.json(stories);
};

exports.getStoryById = async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) return res.status(404).json({ message: 'Story not found' });
  res.json(story);
};

exports.toggleBookmark = async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (!story) return res.status(404).json({ message: 'Story not found' });

  const userId = req.user.id;
  const isBookmarked = story.bookmarkedBy.includes(userId);

  if (isBookmarked) {
    story.bookmarkedBy = story.bookmarkedBy.filter(id => id.toString() !== userId);
  } else {
    story.bookmarkedBy.push(userId);
  }
  await story.save();
  res.json({ message: isBookmarked ? 'Removed bookmark' : 'Added bookmark' });
};