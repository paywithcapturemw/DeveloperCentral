var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    default: '',
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    trim: true,
    default: ''
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: 'Please fill in a username',
    trim: true
  },
  role: {
    type: String,
    default: 'developer',
    enum: ['developer', 'admin']
  },
  verifyEmailTokenExpires: {
    type: String,
    trim: true,
    default: ''
  },
  permissions: {
    type: Array,
    trim: true,
    default: ['Payments', 'Airtime Recharges']
  },
  verifyEmailToken: {
    type: String,
    trim: true,
    default: ''
  },
  clientKey: {
    type: Array,
    default: ''
  },
  token: String,
  resetPasswordToken: {
    type: String,
    trim: true,
    default: ''
  },
  resetPasswordExpires: {
    type: String,
    trim: true,
    default: ''
  },
  hash: String,
  salt: String,
  verified: {
    type: Boolean,
    default: false
  },
  // billPaymentCount: {
  //   type: Number,
  //   default: 0
  // },
  // rechargesCount: {
  //   type: Number,
  //   default: 0
  // },
  // 
  // thinking
  // apps: [{
  //   type: Schema.ObjectId,
  //   ref: 'App'
  // }],
  // keys:[{
  //   type: Schema.ObjectId,
  //   ref: 'ApiKey'
  // }],
  // billPayments: [{
  //   type: Schema.ObjectId,
  //   ref: 'BillsPayment'
  // }],
  // recharges: [{
  //   type: Schema.ObjectId,
  //   ref: 'AirtimeRecharge'
  // }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('User', UserSchema);
