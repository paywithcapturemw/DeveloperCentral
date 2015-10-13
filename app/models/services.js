var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceCountSchema = new Schema({
  type: {
    type: String,
    trim: true,
    default: ''
  },
  count: {
    type: Number,
    trim: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

});

module.exports = mongoose.model('ServiceCount', ServiceCountSchema);
