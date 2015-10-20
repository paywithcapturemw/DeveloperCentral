var express = require('express'),
  mongoose = require('mongoose'),
  User = require('../models/user'),
  Apps = require('../models/apps'),
  ApiKey = require('../models/apiKey'),

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



//2 options
//first async fucntion
//if (generateKey){
// 1.generate key
//}else{
// 1. delete key from key document
//
// }
// second async fucntion
//  2. add key to user's app object
// 3. save new app to app doocument
// 4. save app to user doc(update it)
// 
//}
module.exports = function(app, config, router) {
  // createApp
  //use bycrypt and crypto
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
        return res.status(400).send({
          data: message
        });
      } else {


        async.waterfall([
            function(callback) {
              //add key to user array
              var keyToken = genToken();

              var apikey = new ApiKey({
                user: userId,
                key: keyToken
              });

              apikey.save(function(err, newkey) {
                if (err) {
                  return res.status(400).send({
                    data: err
                  });
                }
                callback(null, newkey._id);

              });
            },
            function(keyId, cb) {

              // add app to app database
              var newApp = new Apps({
                name: req.body.name,
                description: req.body.description,
                user: userId
              });
              newApp.key.push(keyId);

              newApp.save(function(err, app) {
                if (err) {
                  return res.status(400).send({
                    data: err
                  });
                }
                cb(null, app);
              });
            }
          ], function(err, app) {


            User.findById(userId, function(error, user) {
              if (error) {
                return res.send({
                  data: error
                });
              } else {
                user.apps.push(app._id);
                user.save();
                return res.status(200).send({
                  data: app
                });
              }
            });

          }

        );
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

  app.route('/user/:userId/app/:appId/getOneApp').get(function(req, res) {
    var userId = req.params.userId;
    var appId = req.params.appId;

    Apps.findOne({
      user: userId,
      app: appId
    }, function(err, app) {
      if (err) {
        return res.send({
          data: err
        });
      } else {
        return res.status(200).send({
          data: app
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
          data: err
        });
      } else {
        app.remove(function(error) {
          if (error) {
            return res.status(400).send({
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
          data: 'Unauthorised'
        });
      }
      if (user) {
        next();
      }
    });

  };

};
