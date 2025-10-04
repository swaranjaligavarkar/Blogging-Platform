const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

// CRUD
router.post('/', auth, blogController.createBlog);
router.put('/:id', auth, blogController.editBlog);
router.delete('/:id', auth, blogController.deleteBlog);
router.get('/', blogController.getBlogs);

// Like & Comment
router.post('/:id/like', auth, blogController.likeBlog);
router.post('/:id/comments', auth, blogController.addComment);

module.exports = router;