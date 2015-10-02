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
   serviceKey: {
    type: String,
    trim: true,
    default: ''
  },
  serviceCalls:{

  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('App', AppSchema);
