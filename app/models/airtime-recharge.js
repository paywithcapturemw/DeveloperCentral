var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AirtimeRechargeSchema = new Schema({
  amount: {
    type: String,
    trim: true,
    default: ''
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    trim: true,
    default: ''
  },
  paymentcode: {
    type: String,
    trim: true,
    default: ''
  },
  customerid: {
    type: String,
    trim: true,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('AirtimeRecharge', AirtimeRechargeSchema);
