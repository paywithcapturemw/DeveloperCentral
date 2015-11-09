// 'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Like Schema
 */
// var LikeSchema = new Schema({
//   liker: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   },
//   created: {
//     type: Date,
//     default: Date.now
//   }
// });

/**
 * Comment Schema
 */
// var CommentSchema = new Schema({
//   creator: {
//     type: Schema.ObjectId,
//     ref: 'User'
//   },
//   commentContent: {
//     type: String,
//     default: '',
//     trim: true
//   },
//   created: {
//     type: Date,
//     default: Date.now
//   },
//   commentLikes: [LikeSchema]
// });


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
