// // 'use strict';

// /**
//  * Module dependencies.
//  */
// User = require('../models/user'),

var mongoose = require('mongoose'),
  async = require('async'),
  Discussion = require('../models/discussion'),
  Blog = require('../models/blog'),
  Comment = require('../models/comment'),
  _ = require('lodash');
var discussions = require('../../app/controllers/discussion');

// /**
//  * Add a comment
//  */
module.exports.addComment = function(req, res) {
  var discussionId = req.params.discussionId;
  var comment = req.body.comment;
  Discussion.findOne({
    _id: discussionId
  }).populate('discussionComments').exec(function(err, blog) {
    if (err) {
      return res.status(400).send({
        data: err
      });
    } else {
      console.log('in add comment for discussion', blog);

      async.waterfall([
          function(callback) {
            var newComment = new Comment(comment);
            newComment.save(function(error, savedComment) {
              if (error) {
                return res.status(400).send({
                  data: error
                });
              } else {
                callback(null, savedComment);
              }
            });
          }
        ],
        function(err, savedComment) {
          blog.discussionComments.unshift(savedComment);
          console.log('after addin for discussion', blog);

          blog.save(function(err, blog) {
            if (err) {
              console.log(err);
              return res.status(400).send({
                message: 'comment was not saved'
              });
            } else {
              return res.status(200).jsonp(comment);
            }
          });
        });

    }
  });
};

module.exports.addBlogComment = function(req, res) {
  var blogId = req.params.blogId;
  var comment = req.body.comment;
  Blog.findOne({
    _id: blogId
  }).populate('comments').exec(function(err, blog) {
    if (err) {
      return res.status(400).send({
        data: err
      });
    } else {
      async.waterfall([
          function(callback) {
            var newComment = new Comment(comment);
            newComment.save(function(error, savedComment) {
              if (error) {
                return res.status(400).send({
                  data: error
                });
              } else {
                callback(null, savedComment);
              }
            });
          }
        ],
        function(err, savedComment) {
          blog.comments.unshift(savedComment);
          blog.save(function(err, blog) {
            if (err) {
              console.log(err);
              return res.status(400).send({
                message: 'comment was not saved'
              });
            } else {
              return res.status(200).jsonp(comment);
            }
          });
        });
    }
  });
};


// /**
//  * Delete a comment
//  */
// module.exports.deleteComment = function(req, res) {
//     if (req.user.role === 'admin') {

//         var blog = req.blog;

//         blog.discussionComments.id(req.params.commentId).remove();
//         // blog.discussionComments.id(id).remove();

//         blog.save(function(err) {
//             if (err) {
//                 return res.status(400).send({
//                     message: 'comment delete failed'
//                 });
//             } else {
//                 res.jsonp(blog);
//             }
//         });
//     } else {
//         return res.status(401).send({
//             message: 'User is not authorized'
//         });
//     }
// };


module.exports.likeComment = function(req, res) {
  var index = 0;

  var discussionId = req.params.discussionId;
  Discussion.find({
    _id: discussionId
  }).populate('user').exec(function(err, blog) {

    if (err) {
      return res.status(400).send({
        data: err
      });
    } else {

      // var blog = req.body.blog;
      var like = req.body.like;

      like.liker = req.body.userId;


      var hasLikedComment = false;

      if (req.body.userId === blog[0].discussionComments.id(req.params.commentId).creator) {
        return res.send(400, {
          message: 'You cannot like your own comment'
        });
      } else {

        for (var i = 0; i < blog[0].discussionComments.id(req.params.commentId).commentLikes.length; i++) {
          if (req.body.userId === blog[0].discussionComments.id(req.params.commentId).commentLikes[i].liker.toString()) {
            hasLikedComment = true;
            break;
          }
        }
        if (!hasLikedComment) {
          blog[0].discussionComments.id(req.params.commentId).commentLikes.push(like);

          blog[0].save(function(err) {
            if (err) {
              return res.send(400, {
                data: err
              });
            } else {
              res.jsonp(blog[0]);
            }
          });
        } else {
          return res.send(400, {
            message: 'you have already liked this post before'
          });
        }
      }

    }
  });

};
