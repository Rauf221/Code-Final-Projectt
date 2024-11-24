
const Comment = require('../Models/comment');

exports.addComment = async (req, res) => {
  const { name, email, comment, postSlug } = req.body;

  try {
    const newComment = await Comment.create({ name, email, comment, postSlug });
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

exports.getCommentsByPostSlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const comments = await Comment.find({ postSlug: slug }).sort({ createdAt: -1 });
    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Failed to fetch comments', error });
  }
};
exports.getAllComments = async (req, res) => {
    try {
      const comments = await Comment.find(); 
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching all comments:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Failed to delete comment', error });
  }
}