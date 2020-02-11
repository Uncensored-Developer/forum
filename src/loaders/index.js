const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');
const loggerLoader = require('./logger');
const DILoader = require('./dependencyInjector');


module.exports = async ({expressApp}) => {
  // LOAD AND CONNECT DB
  const mongoConn = await mongooseLoader();
  loggerLoader.info('DB loaded and connected');

  const userModel = {
    name: 'userModel',
    model: require('../models/user')
  };

  const discussionModel = {
    name: 'discussionModel',
    model: require('../models/discussion')
  };

  const postModel = {
    name: 'postModel',
    model: require('../models/post')
  };

  await DILoader({
    mongoConn,
    models: [userModel, discussionModel, postModel],
  });

  loggerLoader.info('Dependency Injector loaded');

  await expressLoader({app: expressApp});

  loggerLoader.info('Express Loaded')
};
