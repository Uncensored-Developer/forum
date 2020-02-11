const mongoose = require('mongoose');
const config = require('../config');


module.exports = async () => {
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  return connection.connection.db;
};
