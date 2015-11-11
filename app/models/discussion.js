// 'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Discussion Schema
 */
var DiscussionSchema = new Schema({
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
  serviceType: {
    type: String,
    enum: ['Payments', 'Airtime Recharges', 'Transfers']
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
  discussionComments: [{
    type: Schema.ObjectId,
    ref: 'Comment'
  }],
  discussionLikes: [{
    type: Schema.ObjectId,
    ref: 'Like'
  }]
});


module.exports = mongoose.model('Discussion', DiscussionSchema);
