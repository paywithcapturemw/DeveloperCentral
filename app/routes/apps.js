// 'use strict';

/**
 * Module dependencies.
 */
var apps = require('../../app/controllers/apps'),
  apiKey = require('../../app/controllers/apiKey');

var express = require('express'),
  mongoose = require('mongoose');


module.exports = function(app) {
  app.route('/user/:userId/app/create').post(apps.createApp);
  app.route('/user/:userId/app/:appId/delete')
    // .delete(apps.hasAuthorization, apps.deleteApp);
    .delete(apps.deleteApp);
  app.route('/user/:userId/app/:appId/')
  // .get(apps.hasAuthorization, apps.singleApp);
    .get(apps.singleApp);
  app.route('/user/:userId/app/:appId/update')
    // .put(apps.hasAuthorization, apps.updateApp);
    .put(apps.updateApp);

};
