"use client";

import React, { useEffect, useState } from "react";
import { Search, Trash2, MessageSquare, X, Filter, MoreVertical, RefreshCcw, ChevronDown } from "lucide-react";
import { useDarkMode } from "../../../DarkMode/Darkmode";

interface Comment {
  _id: string;
  name: string;
  email: string;
  comment: string;
  postSlug: string;
  createdAt: string;
}

const AdvancedCommentsTable = () => {
  const { darkMode } = useDarkMode();
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [selectedComments, setSelectedComments] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const filtered = comments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.postSlug.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComments(filtered);
  }, [searchTerm, comments]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:2000/api/comments");
      const data = await response.json();
      setComments(data);
      setFilteredComments(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch comments.");
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:2000/api/comments/${id}`, {
        method: "DELETE",
      });
      setComments(comments.filter((comment) => comment._id !== id));
      setSelectedComments(selectedComments.filter((commentId) => commentId !== id));
      alert("Comment deleted successfully.");
    } catch (error) {
      alert("Failed to delete comment.");
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedComments.length} comments?`)) return;
    
    try {
      await Promise.all(
        selectedComments.map((id) =>
          fetch(`http://localhost:2000/api/comments/${id}`, {
            method: "DELETE",
          })
        )
      );
      setComments(comments.filter((comment) => !selectedComments.includes(comment._id)));
      setSelectedComments([]);
      alert("Comments deleted successfully.");
    } catch (error) {
      alert("Failed to delete comments.");
    }
  };

  const handleSort = (key: string) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sorted = [...filteredComments].sort((a, b) => {
      if (direction === "asc") {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
    setFilteredComments(sorted);
  };

  const handleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(filteredComments.map((comment) => comment._id));
    }
  };

  const handleSelectComment = (commentId: string) => {
    if (selectedComments.includes(commentId)) {
      setSelectedComments(selectedComments.filter((id) => id !== commentId));
    } else {
      setSelectedComments([...selectedComments, commentId]);
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <p className={`text-lg ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            Loading comments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Comments Management
              </h1>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {filteredComments.length} total comments
              </p>
            </div>
            <button
              onClick={fetchComments}
              className={`flex items-center px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300 transition-colors`}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[300px] max-w-md relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`} />
            <input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div className="flex gap-3">
            {selectedComments.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedComments.length})
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                darkMode
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              } border border-gray-300 transition-colors`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className={`rounded-lg shadow ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={darkMode ? "border-b border-gray-700" : "border-b border-gray-200"}>
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedComments.length === filteredComments.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  {["Name", "Email", "Comment", "Post", "Date"].map((header) => (
                    <th
                      key={header}
                      className={`px-6 py-4 text-left ${darkMode ? "text-gray-200" : "text-gray-700"}`}
                    >
                      <button
                        onClick={() => handleSort(header.toLowerCase())}
                        className="flex items-center space-x-1 hover:opacity-80"
                      >
                        <span>{header}</span>
                        <ChevronDown className={`w-4 h-4 transform ${
                          sortConfig.key === header.toLowerCase() &&
                          sortConfig.direction === "desc" ? "rotate-180" : ""
                        }`} />
                      </button>
                    </th>
                  ))}
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComments.map((comment, index) => (
                  <tr
                    key={comment._id}
                    className={`
                      ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                      ${index !== filteredComments.length - 1 ? 
                        (darkMode ? "border-b border-gray-700" : "border-b border-gray-200") : ""}
                    `}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedComments.includes(comment._id)}
                        onChange={() => handleSelectComment(comment._id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          darkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}>
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <span className={darkMode ? "text-gray-200" : "text-gray-900"}>
                          {comment.name}
                        </span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                      {comment.email}
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                      <div className="max-w-xs truncate w-[150px]" title={comment.comment}>
                        {comment.comment}
                      </div>
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        darkMode ? "bg-blue-900/50 text-blue-200 line-clamp-1" : "bg-blue-100 text-blue-800"
                      }`}>
                        {comment.postSlug}
                      </span>
                    </td>
                    <td className={`px-6 py-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => setSelectedComment(comment)}
                          className={`${
                            darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <MessageSquare className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className={`${
                            darkMode ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-700"
                          }`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedComment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className={`relative w-full max-w-2xl mx-4 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="p-6">
                <button
                  onClick={() => setSelectedComment(null)}
                  className={`absolute top-4 right-4 ${
                    darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                  Comment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Author
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        darkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}>
                        {selectedComment.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                          {selectedComment.name} 
                        
                        </p>
                        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                          {selectedComment.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Post
                    </label>
                    <p className={darkMode ? "text-gray-200" : "text-gray-900"}>
                      {selectedComment.postSlug}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Date
                    </label>
                    <p className={darkMode ? "text-gray-200" : "text-gray-900"}>
                      {new Date(selectedComment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Comment
                    </label>
                    <p className={`whitespace-pre-wrap ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                      {selectedComment.comment}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => handleDelete(selectedComment._id)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2 inline-block" />
                    Delete Comment
                  </button>
                  <button
                    onClick={() => setSelectedComment(null)}
                    className={`px-4 py-2 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showFilters && (
          <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end z-40`}>
            <div className={`w-96 h-full ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg p-6`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xl font-bold ${darkMode ? "text-gray-200" : "text-gray-900"}`}>
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className={darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Date Range
                  </label>
                  <input
                    type="date"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Post
                  </label>
                  <select
                    className={`w-full px-3 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-200"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">All Posts</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedCommentsTable;