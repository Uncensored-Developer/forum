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
    }
  },
  {timestamps: true}
);

Discussion.virtual('comments', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'post'
});

Discussion.pre('find', autoPopulateComments);

function autoPopulateComments (next) {
  this.populate('comments', 'body');
  next()
}

module.exports = mongoose.model('Discussion', Discussion);
