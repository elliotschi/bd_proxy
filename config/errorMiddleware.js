exports.errorHandler = (err, req, res) => {
    res.status(err.status || 500).send(err.stack);
};

exports.errorLogger = (err, req, res, next) => {
    // Log stack trace.
    console.error(err.stack);
    next(err);
};
