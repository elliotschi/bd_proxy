const express = require('express');
const applyMiddleware = require('./config/applyMiddleware');

require('dotenv').config();
const app = express();
applyMiddleware(app);

module.exports = app;
