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

module.exports = function(app) {
  app.route('/user/:userId/addKey').post(function(req, res) {
    // a key can be created without an app but if created with an app?
    // 
    var userId = req.params.userId;
    pem.createCSR(function(err, keys) {
      if (!err) {
        // res.status(200).send(keys);
        var newkey = new ApiKey({
          key: keys.clientKey,
          user: userId
        });
        // newkey.key = keys.clientKey;
        // newKey.user = userId;
        newkey.save(function(error, key) {
          if (error) return error + err;
          else {
            User.findById(userId, function(err, user) {
              if (err) return res.send(err);
              else {
                user.keys.push(key._id);
                user.save();
                return res.send({data: key})
              }
            });
          }
        });

      } else {
        return res.status(500).send({
          error: err
        });
      }
    });

    // newKey.user = req.user; // or req.params.userId
    // newKey.app = req.app;
  });

   app.route('/user/:userId/Keys').get(function(req, res) {
      var userId = req.params.userId;
      ApiKey.find({user: userId}, function(err, keys){
        if(err){ return res.send({message: err});}
        else{
          return res.status(200).send({data: keys});
        }
      });

   });
};
