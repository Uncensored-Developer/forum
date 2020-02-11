const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');
const cors         = require('cors');
const api          = require('../api');
const config       = require('../config');


module.exports = ({app}) => {

  // Health check
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.enable('trust proxy');
  app.use(cors());

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Load API routes
  app.use(config.api.prefix.v1, api(app));

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 400);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
