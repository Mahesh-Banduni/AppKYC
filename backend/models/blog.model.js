const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    image: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Blog= mongoose.model('Blog', blogSchema);
module.exports = Blog;