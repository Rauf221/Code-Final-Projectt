"use client"

import { useDarkMode } from "@/DarkMode/Darkmode";
import { useEffect, useState } from "react";



interface Review {
  _id: string;
  name: string;
  email: string;
  title: string;
  comment: string;
  rating: number;
  date: string;
}

const ReviewDashboard = () => {
    const { darkMode } = useDarkMode();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    averageRating: 0,
    fiveStarReviews: 0
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:2000/api/reviews');
      const data = await response.json();
      setReviews(data);
      calculateStats(data);
      setLoading(false);
    } catch (err) {
      setError('Error loading reviews');
      setLoading(false);
    }
  };

  const calculateStats = (data: Review[]) => {
    const total = data.length;
    const averageRating: number = data.reduce((acc: number, review: Review) => acc + review.rating, 0) / total;
    const fiveStarReviews = data.filter((review: Review) => review.rating === 5).length;
    
    setStats({
      total,
      averageRating: parseFloat(averageRating.toFixed(1)),
      fiveStarReviews
    });
  };

  const deleteReview = async (id: string) => {
    try {
      await fetch(`http://localhost:2000/api/reviews/${id}`, {
        method: 'DELETE'
      });
      fetchReviews();
    } catch (err) {
      setError('Error deleting review');
    }
  };

  const filteredReviews = reviews.filter(review => 
    review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    review.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-gray-900 dark:text-white">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
        <div className="text-red-600 dark:text-red-200">{error}</div>
      </div>
    );
  }

  return (
    <div className={`p-6 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Review Management
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Reviews</div>
          <div className={`text-2xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {stats.total}
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Average Rating</div>
          <div className="text-2xl font-bold mt-2 text-yellow-500">
            {stats.averageRating} / 5
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow`}>
          <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>5-Star Reviews</div>
          <div className="text-2xl font-bold mt-2 text-green-500">
            {stats.fiveStarReviews}
          </div>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } uppercase tracking-wider`}>
                  User
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } uppercase tracking-wider`}>
                  Title & Comment
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } uppercase tracking-wider`}>
                  Rating
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } uppercase tracking-wider`}>
                  Date
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                } uppercase tracking-wider`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`${darkMode ? 'bg-gray-800' : 'bg-white'} divide-y ${
              darkMode ? 'divide-gray-700' : 'divide-gray-200'
            }`}>
              {filteredReviews.map((review) => (
                <tr key={review._id} className={`${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{review.name}</div>
                    <div className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>{review.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{review.title}</div>
                    <div className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    } truncate max-w-xs`}>
                      {review.comment}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-lg ${
                            index < review.rating ? 'text-yellow-400' : 'text-gray-500'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => deleteReview(review._id)}
                      className={`text-red-600 hover:text-red-900 ${
                        darkMode 
                          ? 'bg-red-900/50 hover:bg-red-900/70' 
                          : 'bg-red-100 hover:bg-red-200'
                      } px-3 py-1 rounded-full text-sm transition-colors duration-200`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReviewDashboard;