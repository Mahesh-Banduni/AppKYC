const Job = require('../models/job.opening.model.js');
const User = require('../models/user.model.js');
const logger = require("../configs/winston.config.js");
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors.js");

// Create a new job posting
const createJob = async (req, res, next) => {
  try {
    const _id=req.user.id;
    const user = await User.findOne({ _id });
  // Ensure the user has the 'admin' role
  if (user.role !== 'Admin') {
    throw new BadRequestError('Access Denied!!');
  }
    const job = new Job();
    job.location= req.body.location;
    job.description= req.body.description;
    job.title= req.body.title;
    await job.save();
    logger.info("User ID:"+`${user._id}`+" has posted job with ID:"+`${job._id}`+" successfully");
    res.status(201).json(job);
  } catch (error) {
    logger.error("Error in creating job: ",error);
    next(error);
  }
};

// Get all job postings
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    logger.error("Error in fetching all job postings: ",error);
    res.status(500).json({ message: 'Error fetching job postings', error });
  }
};

// Get a single job posting by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      throw new NotFoundError("Job not found");
    }
    res.status(200).json(job);
  } catch (error) {
    logger.error("Error in fetching job posting: ",error);
    next(error);
  }
};

// Delete a job posting
const deleteJob = async (req, res) => {
  try {
    const ID=req.user.id;
    const user = await User.findOne({ ID });
  // Ensure the user has the 'admin' role
  if (user.role !== 'Admin') {
    throw new BadRequestError('Access Denied!!');
  }
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      throw new NotFoundError("Job not found");
    }
    logger.info("User ID:"+`${userId}`+" has deleted job with ID:"+`${blog._id}`+" successfully");
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    logger.error("Error in deleting job posting: ",error);
    next(error);
  }
};

module.exports= {createJob, getJobById, getAllJobs, deleteJob};
