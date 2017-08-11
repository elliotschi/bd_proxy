const {Router} = require('express');
const validateQueryString = require('./validateQueryString');
const {doctorsSearch} = require('../controllers/doctors');
const doctorsRouter = Router();

doctorsRouter.get('/search', validateQueryString(['name']), doctorsSearch);

module.exports = doctorsRouter;
