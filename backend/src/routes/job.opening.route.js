const express = require('express');
const {
  createJob,
  getAllJobs,
  getJobById,
  deleteJob,
} = require('../controllers/job.opening.controller.js');
const auth =require('../middleware/auth.js');

const router = express.Router();

router.post('/', auth, createJob);
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.delete('/:id',auth, deleteJob);

module.exports = router;
