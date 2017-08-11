/**
 * Validates query string parameters and returns expressjs middleware fn.
 * @param {String[]} fields - Fields on the request.query object to validate.
 */
const validateQueryString = fields => (req, res, next) => {
    const invalidFields = fields.filter(fieldName => !req.query[fieldName]);
    if (invalidFields.length > 0) {
        const error = new Error(`Must supply ${invalidFields.join(' ')} in query params`);
        error.status = 400;
        return next(error);
    }
    next();
}

module.exports = validateQueryString;
