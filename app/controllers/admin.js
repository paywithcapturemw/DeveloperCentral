var express = require('express'),
  mongoose = require('mongoose'),
  User = require('../models/user'),
  Apps = require('../models/apps'),
  ServiceCount = require('../models/serviceCount'),
  config = require('../../config/config'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  bcryptjs = require('bcrypt-nodejs'),
  nodemailer = require('nodemailer'),
  secret = 'secretForUser',
  https = require('https'),
  pem = require('pem'),
  fs = require('fs');

module.exports = function(app) {
  var genToken = function() {
    var regex = new RegExp('/', 'g');
    return bcryptjs.genSaltSync(8).toString('hex').replace(regex, '');
  };
  // create admin user with provided email address
  module.exports.createAdmin = function(req, res) {
    var token = genToken();
    User.findOne({
        email: req.body.email,
        username: req.body.username,
      },
      function(err, user) {
        if (err) {
          res.json({
            type: false,
            data: "Error occured: " + err
          });
        } else {
          if (user) {
            res.json({
              type: false,
              data: "User already exists!"
            });
          } else {

            var userModel = new User({
              email: req.body.email,
              username: req.body.username,
              password: token,
              role: 'admin'
            });
            userModel.save(function(err, user) {
              if (err) {
                res.status(400).json({
                  type: false,
                  data: "Error occured: " + err
                });
              } else {
                return res.status(200).send({
                  data: user
                });
              }
            });
          }
        }

      });
  };

//this is for the admin to use on https://developer-central.herokuapp.com/#/admin-user/verifyAdmin
// to comtinue his registration with the password given to him
  module.exports.signUpVerification = function(req, res) {
    User.findOne({
        username: req.body.username,
        password: req.body.password
      },
      function(err, user) {
        if (user) {
          return res.json({
            data: user
          });
        }
        if (err || !user) {
          return res.status(400).send({
            data: "Error occured: " + err
          });
        }

      });
  };

  //when the user enters the new password it should come to this endpoint
  //it is also for updating the admin profile
  module.exports.updateAdmin = function(req, res) {
    var editedUserObj = req.body;
    User.findOne({
      _id: req.params.userId
    }, function(err, user) {
      if (user) {
        if (user.verified === false) {
          user.verified = true;
          user.password = bcrypt.hashSync(req.body.password, 12);
          var userSecret = bcrypt.genSaltSync(20);
          var preString = "PWC_";
          user.token = preString.concat(userSecret.slice(3));

          user.save(function(error, savedUser) {
            if (error) {
              res.status(400).json({
                type: false,
                data: "Error occured: " + error
              });
            } else {
              var url = '/#/signin';
              return res.status(200).send({
                data: user,
                message: 'You have completed your registration. Please sign in to continue.'
              });
            }
          });
        } else {
          user.username = editedUserObj.username;
          user.email = editedUserObj.email;

          user.save(function(error, user) {
            if (error) {
              res.status(400).json({
                data: "Error occured: " + error
              });
            } else {
              return res.status(200).send({
                data: user
              });
            }
          });
        }

      }

      if (err || !user) {

        var message = !user ? "User not found" : err;
        var status = !user ? 401 : 500;
        return res.status(status).send({
          type: false,
          data: "Error occured: " + message
        });

      }
    });
  };


  module.exports.isAdmin = function(req, res, next) {
    User.findOne({
      _id: req.params.userId
    }, function(err, user) {
      if (user.role === 'admin') {
        next();
      } else {
        if (err) {
          return res.status(500).send({
            data: err
          });
        } else {
          return res.status(403).send({
            message: 'Unauthorised User'
          });
        }
      }
    });
  };
  module.exports.developerList = function(req, res) {
    User.find({
      role: 'developer'
    }).populate('apps').exec(function(err, users) {
      if (err) {
        return res.status(500).send({
          data: err
        });
      }
      if (users) {
        return res.status(200).send({
          data: users
        });
      }
    });
  };
  module.exports.allApps = function(req, res) {
    Apps.find().populate('user').exec(function(err, apps) {
      if (err) {
        return res.status(500).send({
          data: err
        });
      }
      if (apps) {
        return res.status(200).send({
          data: apps
        });
      }
    });
  };
  module.exports.allServiceCounts = function(req, res) {
    ServiceCount.find(function(err, counts) {
      if (err) {
        return res.status(500).send({
          data: err
        });
      }
      if (counts) {
        return res.status(200).send({
          data: counts
        });
      }
    });
  };

  module.exports.singleAppServiceCount = function(req, res) {
    ServiceCount.find({
      appId: req.params.appId
    }, function(err, count) {
      if (err) {
        return res.status(500).send({
          data: err
        });
      }
      if (count) {
        return res.status(200).send({
          data: count
        });
      }
    });
  };
};
