import React, { useState, useEffect } from "react";

const CustomerReviews = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedRating, setSelectedRating] = useState(1);
  const [reviewForm, setReviewForm] = useState({
    title: '',
    comment: '',
    name: '',
    email: '',
  });

  interface Review {
    _id: string;
    title: string;
    comment: string;
    name: string;
    email: string;
    rating: number;
    date: string;
  }

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/reviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:2000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reviewForm,
          rating: selectedRating,
          date: new Date().toLocaleDateString(),
        }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews(prev => [newReview, ...prev]);
        setShowReviewForm(false);
        setSelectedRating(0);
        setReviewForm({
          title: '',
          comment: '',
          name: '',
          email: '',
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="w-[1400px] mx-auto px-4 py-8 rubik">
      <h2 className="text-2xl font-medium text-center mb-6">Customer Reviews</h2>

      <div className="flex justify-center">
        {/* Rating Overview */}
        <div className="flex flex-col md:flex-row md:w-[1100px] justify-between items-center mb-8">
          <div className="text-center mb-6 md:mb-0">
            <div className="flex items-center justify-center text-yellow-500 text-xl">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M12 17.75l-6.5 3.67 1.24-7.23-5.25-5.12 7.27-1.06L12 .99l3.24 6.52 7.27 1.06-5.25 5.12 1.24 7.23z" />
                </svg>
              ))}
            </div>
            <p className="text-lg font-medium">5.00 out of 5</p>
            <p className="text-sm text-gray-600">Based on {reviews.length} reviews</p>
          </div>

          <div className="flex flex-col gap-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  {rating} stars
                </span>
                <div className="w-40 h-3 bg-gray-300 rounded-md relative">
                  {rating === 5 && (
                    <div
                      className="h-3 bg-yellow-500 rounded-md"
                      style={{ width: "100%" }}
                    ></div>
                 ) }  {rating === 4 && (
                    <div
                      className="h-3 bg-yellow-500 rounded-md"
                      style={{ width: "80%" }}
                    ></div>
                 ) }  {rating === 3 && (
                    <div
                      className="h-3 bg-yellow-500 rounded-md"
                      style={{ width: "60%" }}
                    ></div>
                 ) }  {rating === 2 && (
                    <div
                      className="h-3 bg-yellow-500 rounded-md"
                      style={{ width: "40%" }}
                    ></div>
                 ) }  {rating === 1 && (
                    <div
                      className="h-3 bg-yellow-500 rounded-md"
                      style={{ width: "20%" }}
                    ></div>
                 ) }
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {reviews.filter(review => review.rating === rating).length}
                 
                </span>
              </div>
              
            ))}
          </div>

          <button
            onClick={() => setShowReviewForm(true)}
            className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition"
          >
            Write a review
          </button>
        </div>
      </div>

      {showReviewForm && (
        <div className="inset-0 bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center text-[#848484]">Write a review</h3>
            <form className="flex flex-col items-center w-[600px]" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-base font-medium text-center text-[#848484] mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={star <= selectedRating ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className="w-8 h-8 text-yellow-500 cursor-pointer"
                      onClick={() => setSelectedRating(star)}
                    >
                      <path d="M12 17.75l-6.5 3.67 1.24-7.23-5.25-5.12 7.27-1.06L12 .99l3.24 6.52 7.27 1.06-5.25 5.12 1.24 7.23z" />
                    </svg>
                  ))}
                </div>
              </div>

              <label className="block text-base font-medium text-[#848484] mb-2">Review Title</label>
              <div className="mb-5 w-full">
                <input
                  type="text"
                  name="title"
                  value={reviewForm.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="Enter a title"
                />
              </div>

              <label className="block text-base font-medium text-[#848484] mb-2">Review</label>
              <div className="mb-5 w-full">
                <textarea
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  rows={4}
                  placeholder="Write your comments here"
                ></textarea>
              </div>

              <label className="block text-base font-medium text-[#848484] mb-2">
                Name (displayed publicly like
                <select name="" className="text-yellow-500" id="">
                  <option value="">John Smith</option>
                  <option value="">John .S</option>
                  <option value="">J.S</option>
                  <option value="">Anonymous</option>
                </select>
                )
              </label>
              <div className="mb-5 w-full">
                <input
                  type="text"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <label className="block text-base font-medium text-[#848484] mb-2">Email</label>
              <div className="mb-5 w-full">
                <input
                  type="email"
                  name="email"
                  value={reviewForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <p className="text-center text-[#848484] leading-relaxed">
                  How we use your data: We'll only contact you about the review you left, and only if necessary. 
                  By submitting your review, you agree to Judge.me's terms, privacy and content policies.
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-4 py-2 text-md text-yellow-400 font-bold border-yellow-400 border-2 transition"
                >
                  Cancel Review
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-md font-bold bg-yellow-400 text-white transition"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div>
        <div className="border-b border-gray-300 pb-2 mb-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">Most Recent</h3>
          <button className="text-yellow-500 text-sm font-medium">Sort</button>
        </div>

        {reviews.map((review) => (
          <div
            key={review._id}
            className="border-b border-gray-300 pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {review.name.charAt(0)}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-gray-800">{review.name}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-1 text-yellow-500">
                  {[...Array(review.rating)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path d="M12 17.75l-6.5 3.67 1.24-7.23-5.25-5.12 7.27-1.06L12 .99l3.24 6.52 7.27 1.06-5.25 5.12 1.24 7.23z" />
                    </svg>
                  ))}
                </div>
                <h5 className="font-semibold text-gray-800">{review.title}</h5>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;