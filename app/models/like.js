var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Like Schema
 */
var LikeSchema = new Schema({
  liker: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Like', LikeSchema);


