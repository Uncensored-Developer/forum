const express = require('express');
const usersRoute = require('./routes/users');
const discussionsRoute = require('./routes/discussions');

module.exports = () => {
  const app = express.Router();

  usersRoute(app);
  discussionsRoute(app);

  return app;
};
