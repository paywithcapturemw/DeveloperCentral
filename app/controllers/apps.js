var express = require('express'),
  mongoose = require('mongoose'),
  User = require('../models/user'),
  Apps = require('../models/apps'),
  ApiKey = require('../models/apiKey'),
  ServiceCount = require('../models/serviceCount'),
  config = require('../../config/config'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  bcryptjs = require('bcrypt-nodejs'),
  nodemailer = require('nodemailer'),
  secret = 'secretForUser',
  https = require('https'),
  pem = require('pem'),
  fs = require('fs'),
  async = require('async');


module.exports = function(app, config, router) {
  var genToken = function() {
    var regex = new RegExp('/', 'g');
    return bcryptjs.genSaltSync(10).toString('hex').replace(regex, '');
  };
  module.exports.createApp = function(req, res) {
    var userId = req.params.userId;
    Apps.findOne({
      name: req.body.name
    }, function(err, existingApp) {
      if (existingApp) {
        var message = 'Duplicate Name';
        return res.status(500).send({
          data: message
        });
      } else {
        
        // add app to app database
        var newApp = new Apps({
          name: req.body.name,
          description: req.body.description,
          user: userId
        });
        newApp.clientSecret = keyToken;
        newApp.save(function(err, finalApp) {
          if (err) {
            return res.status(500).send({
              data: err
            });
          }
          var token = jwt.sign(finalApp._id, secret);
          finalApp.clientId = token;
          var serviceCount = new ServiceCount({
            appId: finalApp._id
          });
          serviceCount.save();
          finalApp.save(function(err, app) {
            if (err) {

            } else {
              return res.status(200).send({
                data: app
              });
            }

          });
        });

      }
    });
  };


  app.route('/user/:userId/app/listApps').get(function(req, res) {

    var userId = req.params.userId;
    Apps.find({
      user: userId
    }, function(err, apps) {
      if (err) {
        return res.send({
          data: err
        });
      } else {
        return res.status(200).send({
          count: apps.length,
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
      if (err) {
        return res.send({
          data: err
        });
      } else {
        app.remove(function(error) {
          if (error) {
            return res.status(500).send({
              data: 'Error deleting your app' + error
            });
          } else {
            return res.status(200).send({
              data: 'App Successfully Deleted.'
            });

          }
        });
      }
    });
  };

  module.exports.updateApp = function(req, res) {
    var userId = req.params.userId;
    var appId = req.params.appId;
    var editedApp = req.body;

    Apps.findOne({
      user: userId,
      _id: appId
    }, function(err, app) {

      app.name = editedApp.name;
      app.description = editedApp.description;

      app.save(function(error, savedApp) {
        if (error) {
          return res.status(500).send({
            data: error
          });
        } else {
          return res.status(200).send({
            data: savedApp
          });
        }
      });
    });
  };

  module.exports.singleApp = function(req, res) {
    var userId = req.params.userId;
    var appId = req.params.appId;
    console.log(req, 'req')
        console.log(req.uer, 'req.user')

    Apps.findOne({
      user: userId,
      _id: appId
    }).sort('-created').populate('key').exec(function(err, app) {
      if (err || !app) {
        return res.status(500).send({
          data: err
        });
      } else {
        ServiceCount.findOne({
          appId: app._id
        }, function(error, serviceCount) {
          if (error) {
            return res.status(500).send({
              data: error
            });
          } else {
            return res.status(200).send({
              data: {
                app: app,
                serviceCount: serviceCount
              }
            });
          }

        });
      }

    });
  };
  module.exports.hasAuthorization = function(req, res, next) {
    User.findOne({
      token: req.headers.token
    }, function(err, user) {
      if (err || !user) {
        return res.status(403).send({
          data: 'Unauthorised'
        });
      }
      if (user) {
        next();
      }
    });

  };

};
