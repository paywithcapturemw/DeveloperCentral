var services = require('../../app/controllers/services'),
  admin = require('../../app/controllers/admin'),

  apiKey = require('../../app/controllers/apiKey');


var express = require('express'),
  mongoose = require('mongoose');


module.exports = function(app) {
  app.route('/user/admin/create')
    .post(admin.createAdmin);
  app.route('/user/admin/verifyAdmin')
    .put(admin.signUpVerification);
  app.route('/user/admin/:userId/completeRegistration')
    .put(admin.updateAdmin);
  app.route('/user/admin/:userId/updateAdmin')
    .put(admin.isAdmin, admin.updateAdmin);
  app.route('/user/admin/:userId/getAllDevelopers')
    .get(admin.isAdmin, admin.developerList);
  app.route('/user/admin/:userId/getAllApps')
    .get(admin.isAdmin, admin.allApps);
  app.route('/user/admin/:userId/getAllServiceCounts')
    .get(admin.isAdmin, admin.allServiceCounts);
  app.route('/user/admin/:userId/apps/:appId/singleAppService')
    .get(admin.isAdmin, admin.singleAppServiceCount);
};
