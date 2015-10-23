var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceCountSchema = new Schema({
  appId: {
    type: String,
    trim: true
  },
  totalCount: {
    type: Number,
    trim: true,
    default: 0
  },
  rechargeCount: {
    type: Number,
    trim: true,
    default: 0
  },
  transferCount: {
    type: Number,
    trim: true,
    default: 0
  },
  paymentCount: {
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
