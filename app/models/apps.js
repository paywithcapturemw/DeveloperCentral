var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppSchema = new Schema({
  name:{
    type: String,
    trim: true,
    unique: true,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
   key: {
    type: Schema.ObjectId,
    ref: 'ApiKey'
  },
   user: {
    type: Schema.ObjectId,
    ref: 'User'
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
  // serviceCalls:{
    //put the counts here
    //payment count
    //transfer count
    //recharge count
  // },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('App', AppSchema);
