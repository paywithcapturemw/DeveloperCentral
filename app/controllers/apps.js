var express = require('express'),
  mongoose = require('mongoose'),
  User = require('../models/user'),
  Apps = require('../models/apps'),
  ApiKey = require('../models/apikey'),

  config = require('../../config/config'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  bcryptjs = require('bcrypt-nodejs'),
  nodemailer = require('nodemailer'),
  secret = 'secretForUser',
  https = require('https'),
  pem = require('pem'),
  fs = require('fs');




module.exports = function(app, config, router) {

  app.route('/user/:userId/app/create').post(function(req, res) {
    //there shoud be a key when  you want to add an app else save like that
    //req.body
    //req.app
    var userId = req.params.userId;
    // add app to app database
    var newApp = new Apps({
      name: req.body.name,
      description: req.body.description,
      user: userId,
      key: req.body.serviceKey
    });
    // newApp.key.push(req.body.serviceKey),
    newApp.save(function(err, app) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        User.findById(userId, function(err, user) {
          if (err) {
            console.log('error', err);
          } else {
            user.apps.push(app._id);
          }
        });

      }
    });

  });


  app.route('/user/:userId/app/getALl').get(function(req, res) {

    var userId = req.params.userId;
    Apps.find({
      user: userId
    }, function(err, apps) {
      if (err) {
        return res.send({
          message: err
        });
      } else {
        return res.status(200).send({
          data: apps
        });
      }
    });

  });

  app.route('/user/:userId/app/:appId/getOne').get(function(req, res) {
    var userId = req.params.userId;
    var appId = req.params.appId;

    Apps.find({
      user: userId,
      app: appId
    }, function(err, apps) {
      if (err) {
        return res.send({
          message: err
        });
      } else {
        return res.status(200).send({
          data: apps
        });
      }
    });

  });


  module.exports.deleteApp = function(req, res) {
    var userId = req.params.userId;
    var appId = req.params.appId;


    Apps.findOne({
      user: userId,
      _id: appId
    }, function(err, app) {
      console.log("app", app);
      if (err) {
        return res.send({
          message: err
        });
      } else {
        app.remove(function(err) {
          if (err) {
            return res.status(400).send({
              message: 'Error deleting your app' + err
            });
          } else {
            return res.status(200).send({
              messgae: 'App Successfully Deleted.'
            });
          }
        });
      }
    });
  };

  module.exports.updateApp = function(req, res) {
    var userId = req.params.userId;
    var appId = req.params.appId;

    Apps.findOne({
      user: userId,
      _id: appId
    }, function(err, app) {
        //TODO
    });
  };
  module.exports.hasAuthorization = function(req, res, next) {
    User.findOne({
      token: req.headers.token
    }, function(err, user) {
      if (err || !user) {
        return res.status(403).send({
          message: 'Unauthorised'
        });
      }
      if (user) {
        next();
      }
    });

  };

};
