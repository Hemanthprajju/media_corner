const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    return res.status(err.statusCode || 500).json({
        message: err.message || 'Request failed'
    });
};

module.exports = errorHandler;
