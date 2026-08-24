function errorHandler(err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            errors: Object.values(err.errors).map((error) => error.message)
        });
    }

    if (err.code === 11000) {
        return res.status(400).json({ message: 'A member with this email already exists' });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({ message: `Invalid value for ${err.path}` });
    }

    console.error(err.message);
    return res.status(500).json({ message: 'Internal server error' });
}

module.exports = errorHandler;
