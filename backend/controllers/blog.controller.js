const User = require('../models/user.model.js');
const Blog = require('../models/blog.model.js');
const {uploadImage} = require('../utils/upload.image.utils.js');
const logger = require("../configs/winston.config.js");
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors.js");

// Create a new blog
const createBlog = async (req, res, next) => {
  try {
    const _id=req.user.id;
    const user = await User.findOne({ _id });
  // Ensure the user has the 'admin' role
  if (user.role !== 'Admin') {
    throw new BadRequestError('Access Denied!!');
  }
    const file = req.file;
    const imageURL = await uploadImage(file);
    const blog = new Blog();
    blog.title= req.body.title;
    blog.content= req.body.content;
    blog.author= req.body.author;
    blog.image= imageURL;
    if(await blog.save()){
      logger.info("User ID:"+`${user._id}`+" has posted blog with ID:"+`${blog._id}`+" successfully");
    }
    res.status(201).json(blog);
  } catch (error) {
    logger.error("Error in creating blog: ",error);
    next(error);
    //res.status(500).json({ message: 'Error creating blog', error });
  }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    logger.error("Error in fetching all blogs: ",error);
    next(error);
    //res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }
    res.status(200).json(blog);
  } catch (error) {
    logger.error("Error in fetching blog: ",error);
    next(error);
    //res.status(500).json({ message: 'Error fetching blog', error });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    const ID=req.user.id;
    const user = await User.findOne({ ID });
  // Ensure the user has the 'admin' role
  if (user.role !== 'Admin') {
    throw new BadRequestError('Access Denied!!');
  }
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      throw new NotFoundError("Blog not found");
    }
    logger.info("User ID:"+`${userId}`+" has deleted blog with ID:"+`${blog._id}`+" successfully");
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    logger.error("Error in deleting blog: ",error);
    next(error);
    //res.status(500).json({ message: 'Error deleting blog', error });
  }
};

module.exports= {createBlog, getAllBlogs, getBlogById, deleteBlog};
