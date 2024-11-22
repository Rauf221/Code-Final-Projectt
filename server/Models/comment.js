// models/comment.js

const mongoose = require('mongoose');

// Define the Comment schema
const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    postSlug: {
      type: String,
      required: true, // Connects the comment to a specific post
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
