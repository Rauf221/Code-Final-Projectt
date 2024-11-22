// routes/commentRoutes.js

const express = require('express');
const router = express.Router();
const { 
  addComment,  
  getCommentsByPostSlug, 
  getAllComments // Add the new controller function
} = require('../Controllers/commentController');

// Route to add a comment
router.post('/comments', addComment);

// Route to get comments by post slug
router.get('/comments/:slug', getCommentsByPostSlug);

// Route to get all comments
router.get('/comments', getAllComments); // Add this route

module.exports = router;
