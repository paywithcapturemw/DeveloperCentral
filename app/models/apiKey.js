var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApiKeySchema = new Schema({
  key: {
    type: String,
    trim: true,
    default: ''
  },
  // app: {
  //   type: Number,
  //   trim: true,
  //   default: 0
  // },
  app: {
    type: Schema.ObjectId,
    ref: 'App'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

});

module.exports = mongoose.model('ApiKey', ApiKeySchema);
