// var express = require('express'),
//   mongoose = require('mongoose'),
//   User = require('../models/user'),
//   Apps = require('../models/apps'),
//   ApiKey = require('../models/apiKey'),
//   config = require('../../config/config'),
//   jwt = require('jsonwebtoken'),
//   bcrypt = require('bcryptjs'),
//   bcryptjs = require('bcrypt-nodejs'),
//   nodemailer = require('nodemailer'),
//   secret = 'secretForUser',
//   https = require('https'),
//   async = require('async'),
//   pem = require('pem'),
//   fs = require('fs');

// module.exports = function(app) {
//   var genToken = function() {
//     var regex = new RegExp('/', 'g');
//     return bcryptjs.genSaltSync(10).toString('hex').replace(regex, '');
//   };

//   module.exports.createKey = function(req, res) {

//     var appId = req.params.appId,
//       userId = req.params.userId;

//     async.waterfall([
//         function(callback) {
//           // get app
//           Apps.findById(appId, function(error, app) {
//             if (error) {
//               return res.status(500).send({
//                 data: error
//               });
//             } else {

//               callback(null, app);

//             }
//           });

//         }
//       ], function(err, app) {

//         var keyToken = genToken();
//         var apikey = {
//           user: userId,
//           key: keyToken
//         };
//         app.key.unshift(apikey);

//         app.save(function(error, app) {
//           if (error) {
//             return res.status(500).send({
//               data: error
//             });
//           } else {
//             console.log('app after save', app);
//             return res.status(200).send({
//               data: keyToken
//             });
//           }
//         });
//       }

//     );

//   };


//   module.exports.deleteKey = function(req, res) {
//     var userId = req.params.userId;
//     var appId = req.params.appId;
//     var keyId = req.params.keyId;
//     console.log('appId', appId, 'keyId', keyId, 'userId', userId);

//     async.waterfall([
//       function(cb) {
//         Apps.findOne({
//           _id: appId
//         }, function(err, app) {
//           console.log('app to delete key from', app);
//           cb(null, app);
//         });
//       },
//       function(app, callback) {
//         // delete key 
//         app.key.id(keyId).remove();
//         callback(null, app);
//       }
//     ], function(err, app) {
//       //delete key id from app
//       console.log('deleted key id from app', app, 'keyId', appId);
//       app.save(function(err) {
//         if (err) {
//           return res.status(500).send({
//             data: 'Error deleting key id from app'
//           });
//         }
//         return res.status(200).send({
//           data: 'key Successfully Deleted.'
//         });
//       });

//     });
//   };

//   app.route('/user/:userId/Keys').get(function(req, res) {
//     var userId = req.params.userId;
//     ApiKey.find({
//       user: userId
//     }, function(err, keys) {
//       if (err) {
//         return res.status(500).send({
//           message: err
//         });
//       } else {
//         return res.status(200).send({
//           data: keys
//         });
//       }
//     });

//   });
// };
