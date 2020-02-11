const config = require('./config');
const express = require('express');
const loggerLoader = require('./loaders/logger');

async function startServer() {

  const app = express();

  await require('./loaders')({expressApp: app});

  app.listen(config.port, err => {
    if (err) {
      loggerLoader.error(err);
      process.exit(1);
      return;
    }
    loggerLoader.info(`
      ################################################
          Server listening on port: ${config.port} 
      ################################################
    `);
  })

}

startServer();
