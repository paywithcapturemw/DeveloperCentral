// 'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/user'),
    blogs = require('../../app/controllers/blog'),
    comments = require('../../app/controllers/comments');


module.exports = function(app) {
    app.route('/blogs')
        .get(blogs.list)
        .post(users.requiresLogin, blogs.create);

    app.route('/blogs/:blogId')
        .get(blogs.read)
        .put(users.requiresLogin, blogs.update)
        .delete(users.requiresLogin, blogs.delete);

    app.route('/blogs/:blogId/like')
        .post(users.requiresLogin, blogs.likePost);

    // all users
    app.route('/blogs/:blogId/comments')
        .post(users.requiresLogin, comments.addComment);

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