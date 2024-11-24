const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} = require('../Controllers/blogController');

router.get('/', getPosts);

router.get('/:slug', getPostBySlug);

router.post('/', createPost);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);

module.exports = router;
