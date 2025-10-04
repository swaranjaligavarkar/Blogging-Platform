const Blog = require('../models/Blog');
const User = require('../models/User');

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, categories } = req.body;
    const blog = new Blog({
      title,
      content,
      categories,
      author: req.user.id
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Edit Blog
exports.editBlog = async (req, res) => {
  try {
    const updates = req.body;
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      updates,
      { new: true }
    );
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get Blogs (with search & filter)
exports.getBlogs = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { content: new RegExp(search, "i") }
      ];
    }
    if (category) {
      query.categories = category;
    }
    const blogs = await Blog.find(query).populate('author', 'username profilePic').sort('-createdAt');
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Like Blog
exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog.likes.includes(req.user.id)) {
      blog.likes.push(req.user.id);
    } else {
      blog.likes = blog.likes.filter(like => like.toString() !== req.user.id);
    }
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add Comment
exports.addComment = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.comments.push({
      user: req.user.id,
      content: req.body.content
    });
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};