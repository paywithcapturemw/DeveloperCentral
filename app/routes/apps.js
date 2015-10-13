// 'use strict';

/**
 * Module dependencies.
 */
var apps = require('../../app/controllers/apps'),
    apiKey = require('../../app/controllers/apiKey');

var express = require('express'),
  mongoose = require('mongoose');

  
module.exports = function(app) {
     app.route('/user/:userId/app/:appId/delete')
      .delete(apps.hasAuthorization, apps.deleteApp);
      app.route('/user/:userId/app/:appId/update')
      .put(apps.hasAuthorization, apps.updateApp);
};

