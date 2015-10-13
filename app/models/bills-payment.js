var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BillsPaymentSchema = new Schema({
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
  user:{
    type: Schema.ObjectId,
    ref: 'User'
  }

});

module.exports = mongoose.model('BillsPayment', BillsPaymentSchema);

 // amount: (required) the bill amount to pay
// phone: (required) the customer / user 's phone number
// email: (required) the customer / user 's email address
// paymentcode: (required) the paymentcode of the sunscriber network as returned from the GetBillerPaymentItems response from interswitch
// customerid: 