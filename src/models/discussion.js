const mongoose = require('mongoose');


const Discussion = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true
    },
    creator: {
      type: String,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    posts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
      }
    ]
  },
  {timestamps: true}
);

module.exports = mongoose.model('Discussion', Discussion);
