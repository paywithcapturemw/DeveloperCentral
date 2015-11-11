// // 'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/user'),
  blogs = require('../../app/controllers/blog'),
  admin = require('../../app/controllers/admin'),
  comments = require('../../app/controllers/comments');


module.exports = function(app) {
  app.route('/blogs')
    .get(blogs.list);
   app.route('/admin/:userId/blogs') 
    .post(users.requiresLogin, admin.isAdmin, blogs.create);

  app.route('/blogs/:blogId')
    .get(blogs.read);

  app.route('/admin/:userId/blogs/:blogId')
    .put(users.requiresLogin, admin.isAdmin, blogs.update)
    .delete(users.requiresLogin, admin.isAdmin, blogs.delete);

  app.route('/blogs/:blogId/like')
    .post(users.requiresLogin, blogs.likePost);

  // all users
  app.route('/blogs/:blogId/comments')
    .post(users.requiresLogin, comments.addBlogComment);

  // admin
  // app.route('/blogs/:blogId/comments/:commentId')
  //     // .get(comments.showComment)
  //     .delete(users.requiresLogin, comments.hasAuthorization, comments.deleteComment);

  // like Comment
  app.route('/blogs/:blogId/comments/:commentId/like')
    .post(users.requiresLogin, comments.likeComment);


  // app.route('/blogs/:blogId/comments/:commentId/inappropriate')
  //     .post(users.requiresLogin, comments.inappropriateComment);

  // app.route('/blogs/:blogId/comments/:commentId/approved')
  //     .post(users.requiresLogin, comments.hasAuthorization, comments.approvedComment);


  // Finish by binding the blog middleware
  // app.param('blogId', blogs.blogByID);

  // Finish by binding the comment middleware
  // app.param('commentId', comments.commentByID);
};
