// 'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Blog = require('../models/blog'),
  User = mongoose.model('User'),
  Like = require('../models/like'),
  Comment = require('../models/comment'),
  _ = require('lodash');

/**
 * Create a blog
 */
module.exports.create = function(req, res) {
  blogBody = req.body;

  var newBlog = new Blog({
    caption: blogBody.caption,
    title: blogBody.title,
    blogContent: blogBody.blogContent
  });
  newBlog.user = req.params.userId;
  newBlog.save(function(error, blog) {
    if (error) {
      return res.status(500).send({
        data: error
      });
    } else {
      return res.status(200).send({
        data: blog
      });
    }
  });
};

/**
 * Show the current blog
 */
module.exports.read = function(req, res) {

  var blogId = req.params.blogId;
  Blog.findOne({
      _id: blogId
    }).populate('user').populate('comments')
    .exec(function(err, blog) {
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
  var blogId = req.params.blogId;
  var editedBlog = req.body.blog;
  Blog.findOne({
    _id: blogId
  }, function(err, blog) {
    blog.title = editedBlog.title;
    blog.caption = editedBlog.caption;
    blog.blogContent = editedBlog.blogContent;
    blog.save(function(err) {
      if (err) {
        return res.status(400).send({
          data: err
        });
      } else {
        console.log('blog updated', blog);
        res.jsonp(blog);
      }
    });
  });
};



/**
 * Delete a blog
 */
module.exports.delete = function(req, res) {
  var blogId = req.params.blogId;
  Blog.remove({
    _id: blogId
  }, function(err, blog) {
    if (err)
      res.send(err);
    res.json({
      message: 'Successfully deleted'
    });
  });
};

/**
 * List of Blogs
 */
module.exports.list = function(req, res, next) {
  Blog.find().sort('-created').populate('user').exec(function(err, blogs) {
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
  var blogId = req.params.blogId;
  Blog.findOne({
    _id: blogId
  }).populate('user likes').exec(function(err, blog) {

    if (err) {
      return res.status(400).send({
        data: err
      });
    } else {
      var hasLiked = false;

      if (req.body.userId === blog.user._id) {
        return res.status(400).send({
          data: 'You cannot like your own post.'
        });
      } else {
        // var hasliked = true (req.body.userId == blog.likes[i].liker)  ? false;
        for (var i = 0; i < blog.likes.length; i++) {
          if (req.body.userId == blog.likes[i].liker) {
            hasLiked = true;
            break;
          }
        }
        if (!hasLiked) {
          var newLike = new Like(req.body.like);

          async.waterfall([
              function(callback) {
                newLike.save(function(error, savedLike) {
                  if (error) {
                    return res.status(400).send({
                      data: error
                    });
                  } else {
                    callback(null, savedLike);
                  }
                });
              }
            ],
            function(err, newLike) {

              blog.likes.push(newLike._id);
              blog.save(function(err, blog) {
                if (err) {
                  return res.status(400).send({
                    data: err
                  });
                } else {
                  res.jsonp(newLike);
                }
              });
            });
        } else {
          return res.status(400).send({
            data: 'You have liked this post before.'
          });
        }
      }
    }
  });
};
