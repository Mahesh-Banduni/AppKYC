const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const logger = require("../configs/winston.config.js");
const {
  ConflictError,
  NotFoundError,
  BadRequestError,
} = require("../errors/errors.js");
const crypto = require('crypto');
const dotenv = require("dotenv");

dotenv.config();

// Create a new blog
const loginUser = async (req, res, next) => {
  try {
    const ID = req.body.ID;
    const user = await User.findOne({ ID });
    
    if (!user) {
      logger.info("Failed login attempt");
      throw new NotFoundError("User not found");
    }
    const password=req.body.password;
  
    const hashPassword = crypto.createHash('sha256', process.env.JWT_SECRET).update(password).digest('hex');
    console.log(hashPassword);
  
    //Check password is correct
    if (user.password !== hashPassword) {
      logger.info("Failed login attempt");
      throw new BadRequestError("Incorrect password");
    }
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  
    logger.info("User ID:"+`${user._id}`+" has logged-in successfully");
    res.status(201).json({user, token});
  } catch (error) {
    logger.error("Error in creating blog: ",error);
    next(error);
  }
};

module.exports= loginUser;