var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApiKeySchema = new Schema({
  key: {
    type: String,
    trim: true,
    default: ''
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

var AppSchema = new Schema({
  name: {
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
  key: [ApiKeySchema],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  clientId:{
    type: String,
    trim: true
  },
  clientSecret:{
    type: String,
    trim: true
  },
  // rechargeCount: {
  //   type: Number,
  //   trim: true,
  //   default: 0
  // },
  // transferCount: {
  //   type: Number,
  //   trim: true,
  //   default: 0
  // },
  // paymentCount: {
  //   type: Number,
  //   trim: true,
  //   default: 0
  // },
  services: {
    type: Array,
    trim: true,
    default: ['Payments', 'Airtime Recharges', 'Transfers']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('App', AppSchema);
