const express = require('express');
const loginUser= require('../controllers/user.controller.js');
const router = express.Router();

router.post('/', loginUser);

module.exports = router;
