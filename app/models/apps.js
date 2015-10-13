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
   keys: {
    type: Schema.ObjectId,
    ref: 'ApiKey'
  },
   user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  // serviceCalls:{
    
  // },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('App', AppSchema);
