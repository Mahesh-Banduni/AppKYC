const mongoose = require('mongoose');
const { ConflictError, NotFoundError, BadRequestError } = require('../errors/errors.js');

const errorHandler = (error, req, res, next) => {
    if (error instanceof ConflictError || error instanceof BadRequestError || error instanceof NotFoundError) {
        return res.status(error.statusCode).json({ error: error.message });
    }

    if (error instanceof mongoose.Error.ValidationError) {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ error: validationErrors });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = { errorHandler };
