const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} = require('../Controllers/blogController');

// GET all posts
router.get('/', getPosts);

// GET a single post by slug
router.get('/:slug', getPostBySlug);

// POST create a new post
router.post('/', createPost);

// PUT update a post
router.put('/:id', updatePost);

// DELETE a post
router.delete('/:id', deletePost);

module.exports = router;
