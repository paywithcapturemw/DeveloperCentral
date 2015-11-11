var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
  creator: {
    type: Schema.Types.Mixed,
    ref: 'User'
  },
  commentContent: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  commentLikes: [{
    type: Schema.ObjectId,
    ref: 'Like'
  }]
});

module.exports = mongoose.model('Comment', CommentSchema);
