const mongoose = require('mongoose');
const CommentSchema = require('./Comment');
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Quill delta or HTML
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  categories: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Blog', BlogSchema);