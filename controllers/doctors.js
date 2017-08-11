const {addDocumentIfNotExists} = require('../models/doctors');
const searchDoctorsByName = require('../api/searchDoctorsByName');

// Request handler for express.
exports.doctorsSearch = (req, res, next) => {
    const {name} = req.query;
    let responseBody = null;
    return searchDoctorsByName(name)
        .then(response => {
            responseBody = response.body;
            return Promise.all(
                responseBody.data.map(document => addDocumentIfNotExists(document))
            );
        })
        .then(() => {
            res.json(responseBody);
        })
        .catch(err => {
            const error = new Error(err);
            error.status = 400;
            next(error);
        });
};
