// 'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Blog Schema
 */
var BlogSchema = new Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  blogContent: {
    type: String,
    default: '',
    trim: true
  },
  caption: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: Schema.ObjectId,
    ref: 'Like'
  }]
});


module.exports = mongoose.model('Blog', BlogSchema);
