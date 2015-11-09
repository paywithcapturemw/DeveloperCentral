// 'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/user'),
    discussions = require('../../app/controllers/discussion'),
    comments = require('../../app/controllers/comments');


module.exports = function(app) {
    app.route('/discussions')
        .get(discussions.list)
        .post(users.requiresLogin, discussions.create);

    app.route('/discussions/:discussionId')
        .get(discussions.read)
        .put(users.requiresLogin, discussions.update)
        .delete(users.requiresLogin, discussions.delete);

    app.route('/discussions/:discussionId/like')
        .post(users.requiresLogin, discussions.likePost);

    // all users
    app.route('/discussions/:discussionId/comments')
        .post(users.requiresLogin, comments.addComment);

    // admin
    // app.route('/discussions/:discussionId/comments/:commentId')
    //     // .get(comments.showComment)
    //     .delete(users.requiresLogin, comments.hasAuthorization, comments.deleteComment);

    // like Comment
    app.route('/discussions/:discussionId/comments/:commentId/like')
        .post(users.requiresLogin, comments.likeComment);


    // app.route('/discussions/:discussionId/comments/:commentId/inappropriate')
    //     .post(users.requiresLogin, comments.inappropriateComment);

    // app.route('/discussions/:discussionId/comments/:commentId/approved')
    //     .post(users.requiresLogin, comments.hasAuthorization, comments.approvedComment);


    // Finish by binding the blog middleware
    // app.param('discussionId', discussions.blogByID);

    // Finish by binding the comment middleware
    // app.param('commentId', comments.commentByID);
};