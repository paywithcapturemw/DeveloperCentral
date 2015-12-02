// 'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/user'),
  discussions = require('../../app/controllers/discussion'),
  admin = require('../../app/controllers/admin'),
  comments = require('../../app/controllers/comments');


module.exports = function(app) {
  app.route('/discussions')
    .get(discussions.list)
    .post(users.requiresLogin, discussions.create);

  app.route('/discussions/:discussionId')
      .get(discussions.read);
  
  app.route('/admin/:userId/discussions/:discussionId')
    .put(users.requiresLogin, admin.isAdmin, discussions.update)
    .delete(users.requiresLogin, admin.isAdmin, discussions.delete);
  app.route('/discussions/:discussionId/like')
    .post(users.requiresLogin, discussions.likePost);

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

};
