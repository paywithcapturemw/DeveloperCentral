// 'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Discussion = require('../models/discussion'),
  // Discussion = mongoose.model('Discussion'),

  // User = require('../models/User'),
  _ = require('lodash');


/**
 * Create a blog
 */
module.exports.create = function(req, res) {
  blogBody = req.body;

  var newBlog = new Discussion({
    caption: blogBody.caption,
    title: blogBody.title,
    serviceType: blogBody.serviceType,
    blogContent: blogBody.blogContent
  });
  newBlog.user = req.body.user;
  newBlog.save(function(error, savedBlog) {
    if (error) {
      console.log('error:', error);
      return res.status(500).send({
        data: error
      });
    } else {
      return res.status(200).send({
        data: savedBlog
      });
    }
  });
};

/**
 * Show the current blog
 */
module.exports.read = function(req, res) {

  var discussionId = req.params.discussionId;
  Discussion.findOne({
    _id: discussionId
  }).populate('user comments.creator').exec(function(err, blog) {
    if (err) {
      return res.status(400).send({
        data: err
      });
    } else {
      return res.jsonp(blog);
    }
  });
};

/**
 * Update a blog
 */
module.exports.update = function(req, res) {
  // if (req.user.role === 'admin') {

  var blog = req.blog;

  blog = _.extend(blog, req.body);

  blog.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.jsonp(blog);
    }
  });
};


/**
 * Delete a blog
 */
module.exports.delete = function(req, res) {
  var blog = req.blog;

  blog.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.jsonp(blog);
    }
  });
};

/**
 * List of Blogs
 */
module.exports.list = function(req, res, next) {

  Discussion.find().sort('-created').populate('user').exec(function(err, blogs) {
    if (err) {
      return res.status(400).send({
        data: err
      });
    } else {
      res.jsonp(blogs);
    }
  });
};

/**
 * Like a Post
 */
module.exports.likePost = function(req, res) {
  var discussionId = req.params.discussionId;
  Discussion.find({
    _id: discussionId
  }).populate('user').exec(function(err, blog) {

    if (err) {
      return res.status(400).send({
        data: err
      });
    } else {

      // var blog = req.body.blog,
      like = req.body.like;
      // like.liker = req.user;
      var hasLiked = false;
      console.log('blog:', blog);

      if (req.body.userId === blog[0].user._id.toString()) {
        console.log('You cannot like your own post');
        return res.status(400).send({
          data: 'You cannot like your own post'
        });
      } else {
        for (var i = 0; i < blog[0].likes.length; i++) {
          if (req.body.userId === blog[0].likes[i].liker.toString()) {
            hasLiked = true;
            break;
          }
        }
        if (!hasLiked) {
          blog[0].likes.push(like);

          blog[0].save(function(err) {
            if (err) {
              return res.status(400).send({
                data: err
              });
            } else {
              res.jsonp(like);
            }
          });
        } else {
          console.log('you have already liked this post before');
          return res.status(400).send({

            data: 'you have already liked this post before'
          });
        }
      }
    }
  });

};
