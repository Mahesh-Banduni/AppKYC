const multer = require('multer');
const path =require('path');

const uploadPic = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size 5MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only images are allowed!'));
    }
    cb(null, true);
  },
}).single('image', 1);

module.exports = {uploadPic};