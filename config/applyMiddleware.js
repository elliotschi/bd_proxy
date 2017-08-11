const compression = require('compression');
const logger = require('morgan');
const indexRouter = require('../routes/');
const doctorsRouter = require('../routes/doctors');
const {errorHandler, errorLogger} = require('./errorMiddleware');

module.exports = app => {
    app.use(logger('dev'));
    app.use(compression());
    app.use('/', indexRouter);
    app.use('/api/v1/doctors', doctorsRouter);
    app.use('*', (req, res, next) => {
        const error = new Error('404: Not Found');
        error.status = 404;
        next(error);
    });
    app.use(errorHandler);
    if (process.env.NODE_ENV === 'development') {
        app.use(errorLogger);
    }
};
