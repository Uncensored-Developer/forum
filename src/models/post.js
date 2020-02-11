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
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

Post.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

Post.pre('find', autoPopulateComments);

function autoPopulateComments (next) {
  this.populate('comments', 'body');
  next()
}

module.exports = mongoose.model('Post', Post);
