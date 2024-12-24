const express = require('express');
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
}= require('../controllers/blog.controller.js');
const {uploadPic} =require('../middleware/multer.js');
const auth =require('../middleware/auth.js');

const router = express.Router();

router.post('/', auth, uploadPic, createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.delete('/:id', auth, deleteBlog);

module.exports = router;
