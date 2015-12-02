// 'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
  Discussion = require('../models/discussion'),
  Like = require('../models/like'),
  Comment = require('../models/comment'),
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
  }).populate('user discussionComments discussionComments.creator').exec(function(err, blog) {
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
  // var blog = req.body.blog;
  
  // blog.save(function(err) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: err
  //     });
  //   } else {
  //     res.jsonp(blog);
  //   }
  // });
};


/**
 * Delete a blog
 */
module.exports.delete = function(req, res) {
  var discussionId = req.params.discussionId;
  Discussion.remove({
    _id: discussionId
  }, function(err, discussion) {
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
  Discussion.findOne({
    _id: discussionId
  }).populate('user discussionLikes').exec(function(err, blog) {
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
        for (var i = 0; i < blog.discussionLikes.length; i++) {
          if (req.body.userId == blog.discussionLikes[i].liker) {
            hasLiked = true;
            break;
          }
        }

        if (!hasLiked) {
           async.waterfall([
              function(callback) {
                var newLike = new Like(req.body.like);
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
              blog.discussionLikes.push(newLike);
              
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
