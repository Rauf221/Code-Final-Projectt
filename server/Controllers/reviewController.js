const Review = require('../Models/review'); 


const createReview = async (req, res) => {
  try {
    const { name, email, title, comment, rating } = req.body;

    const review = new Review({
      name,
      email,
      title,
      comment,
      rating,
    });

    const savedReview = await review.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(400).json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ date: -1 }) 
      .select('-email'); 

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: error.message });
  }
};
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.remove();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview,
};
