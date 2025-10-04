const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const Blog = require('../models/Blog');
const User = require('../models/User');

// Get all users
router.get('/users', auth, admin, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Get all blogs
router.get('/blogs', auth, admin, async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// Delete any user
router.delete('/users/:id', auth, admin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// Delete any blog
router.delete('/blogs/:id', auth, admin, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted' });
});

module.exports = router;