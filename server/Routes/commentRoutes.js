
const express = require('express');
const router = express.Router();
const { 
  deleteComment, 
  addComment,  
  getCommentsByPostSlug, 
  getAllComments 
} = require('../Controllers/commentController');

router.post('/comments', addComment);

router.get('/comments/:slug', getCommentsByPostSlug);

router.get('/comments', getAllComments); 
router.delete('/comments/:id', deleteComment); 

module.exports = router;
