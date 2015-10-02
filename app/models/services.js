var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServiceSchema = new Schema({
amount:{
    type: String,
    trim: true,
    default: ''
  },
phone:{
    type: String,
    trim: true,
    default: ''
  },
  email:{
    type: String,
    trim: true,
    default: ''
  },
  paymentcode:{
    type: String,
    trim: true,
    default: ''
  },
  customerid:{
    type: String,
    trim: true,
    default: ''
  }

});

module.exports = mongoose.model('Service', ServiceSchema);
