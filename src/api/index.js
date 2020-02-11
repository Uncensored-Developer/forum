const express = require('express');
const usersRoute = require('./routes/users');
const discussionsRoute = require('./routes/discussions');
const postsRoute = require('./routes/posts');

module.exports = () => {
  const app = express.Router();

  usersRoute(app);
  discussionsRoute(app);
  postsRoute(app);

  return app;
};
