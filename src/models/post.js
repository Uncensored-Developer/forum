const mongoose = require('mongoose');


const Post = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    discussion: {
      type: mongoose.Schema.ObjectId,
      ref: 'Discussion',
      required: true
    },
    user: {
      type: String,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);



module.exports = mongoose.model('Post', Post);
