const mongoose = require('mongoose');


const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Enter a name'],
      index: true
    },
    email: {
      type: String,
      required: [true, 'Enter an email'],
      index: true,
      unique: true
    }
  },
  {timestamps: true}
);

module.exports = mongoose.model('User', User);
