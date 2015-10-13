
var express = require('express'),
  mongoose = require('mongoose'),
  needle = require('needle'),
  BillsPayment = require('../models/bills-payment'),
  User = require('../models/user'),
  request = require('request'),
  async = require('async');
_ = require('lodash');


module.exports = function(app, config, router) {

  var isAuthorizedMiddleware = function(req, res) {
    User.findOne({
      token: req.headers.token
    }, function(err, user) {
      if (err || !user) {
        res.status(403).send({
          message: 'Unauthorised'
        });
      }
      if (user) {
        console.log('user', user);
        return user;
      }
    });
    return;
  };

  // in documentation, let it be known that the token should be sent from the front end
  // Also use APP token?
  //get list of billers
  //app.route('/api/v1/qt/billers')
      // .get(apps.hasAuthorization, apps.getBillers);
  app.route('/api/v1/qt/billers').get(function(req, res) {
    var url = 'http://pwcproduction.com/api/v1/qt/billers';
    async.waterfall([
      function(callback) {
        // function isAuthorizedMiddleware(req, res) {
        User.findOne({
          token: req.headers.token
        }, function(err, user) {
          if (err || !user) {
            res.status(403).send({
              message: 'Unauthorised'
            });
          }
          if (user) {
            callback(null, user);
          }
        });
      }
    ], function(err, user) {
      var url = 'http://pwcproduction.com/api/v1/qt/billers';
      var responseObject;
      var finalResponse;
      needle.get(url, function(error, response) {
        var bodyObj = response.body;
        if (error) {
          res.status(500).send({
            message: 'Error Getting Billers. Try again later.'
          });
        }
        if (!error || bodyObj.ResponseCode === '90000') {
          res.status(200).send(response.body.BillerList);
        }

      });
    });

  });
  app.route('/api/v1/qt/billers/:billerId/payitems').get(function(req, res) {
    var biller = req.params.billerId;
    async.waterfall([
      function(callback) {
        // function isAuthorizedMiddleware(req, res) {
        User.findOne({
          token: req.headers.token
        }, function(err, user) {
          if (err || !user) {
            res.status(403).send({
              message: 'Unauthorised'
            });
          }
          if (user) {
            callback(null, user);
          }
        });
      }
    ], function(err, user) {
      var url = 'http://pwcproduction.com/api/v1/qt/billers/' + biller + '/payitems';
      var responseObject;
      var finalResponse;
      needle.get(url, function(error, response) {

        if (error) {
          res.status(500).send({
            message: 'Error Getting Biller Items. Try again later.'
          });
        }
        if (!error && response.body.ResponseCode === 90000) {
          console.log('suceess get dta', response.body);

          responseObject = JSON.stringify(response.body.PaymentItemList);
          try {
            finalResponse = JSON.parse(responseObject);

          } catch (e) {
            console.log(e);
          }

          res.status(200).send(finalResponse);
        }

      });
    });
  });
  app.route('/api/v1/qt/recharge').post(function(req, res) {
    var biller = req.params.billerId;
    var postBody = req.body;
    async.waterfall([
      function(callback) {
        // function isAuthorizedMiddleware(req, res) {
        User.findOne({
          token: req.headers.token
        }, function(err, user) {
          if (err || !user) {
            res.status(403).send({
              message: 'Unauthorised'
            });
          }
          if (user) {
            callback(null, user);
          }
        });
      }
    ], function(err, user) {
      var url = 'http://pwcproduction.com/api/v1/qt/recharge';
      var responseObject;
      var finalResponse;
      var finalError;
      needle.post(url, postBody, function(error, response) {
        console.log('response errors', response.body.message, 'errors', response.body.errors, 'status', response.body.status_code);

        if (error || (response.body.message === 'Invalid Parameters.')) {
          var errorMessage = response.body.message;
          res.status(500).send({
            message: (response.body.message === 'Invalid Parameters') ? 'Invalid Parameters' :'Error Recharging.'
          });
        }
        if (!error && response.body.ResponseCode === 90000) {
          console.log('suceess get dta', response.body);
          responseObject = JSON.stringify(response.body.PaymentItemList);
          try {
            finalResponse = JSON.parse(responseObject);
          } catch (e) {
            console.log(e);
          }
          var count = user.rechargesCount + 1;
          User.findByIdAndUpdate(user._id, {
            $set: {
              rechargesCount: count
            }
          }, function(err, tank) {
            if (err) return handleError(err);
            res.status(200).send(finalResponse);
          });
        } 
      });
    });
  });

  app.route('/api/v1/qt/bills/pay').post(function(req, res) {
    var biller = req.params.billerId;
    var postBody = req.body;
    async.waterfall([
      function(callback) {
        // function isAuthorizedMiddleware(req, res) {
        User.findOne({
          token: req.headers.token
        }, function(err, user) {
          if (err || !user) {
            res.status(403).send({
              message: 'Unauthorised'
            });
          }
          if (user) {
            callback(null, user);
          }
        });
      }
    ], function(err, user) {
      var url = 'http://pwcproduction.com/api/v1/qt/bills/pay';
      var responseObject;
      var finalResponse;
      var finalError;
      needle.post(url, postBody, function(error, response) {
        if (error || response.body.errors === 'Invalid Parameters') {
          // console.log('error message passed');
          // var errorBody = JSON.stringify(response.body.errors);
          // try {
          //   finalError = JSON.parse(errorBody);

          // } catch (e) {
          //   console.log(e);
          // }
          // res.status(500).send({
          //   error: finalError,
          //   message: 'Error Recharging.'
          // });
          res.send({
            message: 'Error Recharging.'
          });
        }
        if (!error && response.body.ResponseCode === 90000) {
          responseObject = JSON.stringify(response.body.PaymentItemList);
          try {
            finalResponse = JSON.parse(responseObject);

          } catch (e) {
            console.log(e);
          }
          // console.log(response.body);
          var count = user.billPaymentCount + 1;
          // console.log('count', count);
          User.findByIdAndUpdate(user._id, {
            $set: {
              billPaymentCount: count
            }
          }, function(err, tank) {
            if (err) return handleError(err);
            res.status(200).send(finalResponse);
          });

        } else console.log('response errors', response.body);

      });
    });
  });

};
