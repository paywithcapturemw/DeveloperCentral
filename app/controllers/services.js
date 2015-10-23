
var express = require('express'),
  mongoose = require('mongoose'),
  needle = require('needle'),
  BillsPayment = require('../models/bills-payment'),
  User = require('../models/user'),
  Apps = require('../models/apps'),
  request = require('request'),
  async = require('async');
_ = require('lodash');


module.exports = function(app, config, router) {

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


  //user should send token and a key for authorization
  // in documentation, let it be known that the token should be sent from the front end
  // Also use APP token?
  //get list of billers
  //app.route('/api/v1/qt/billers')
      // .get(apps.hasAuthorization, apps.getBillers);
   module.exports.listBillers = function(req, res) {
    var url = 'http://pwcproduction.com/api/v1/qt/billers';
    async.waterfall([
      function(callback) {
        // function isAuthorizedMiddleware(req, res) {
        User.findOne({
          token: req.headers.token
        }, function(err, user) {
          if (err || !user) {
            return res.status(403).send({
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
          return res.status(500).send({
            message: 'Error Getting Billers. Try again later.'
          });
        }
        if (!error || bodyObj.ResponseCode === '90000') {
          return res.status(200).send(response.body.BillerList);
        }

      });
    });

  };

  module.exports.singleBiller = function(req, res) {
    var biller = req.params.billerId;
    async.waterfall([
      function(callback) {
        // function isAuthorizedMiddleware(req, res) {
        User.findOne({
          token: req.headers.token
        }, function(err, user) {
          if (err || !user) {
                        console.log('Unauthorised');

            return res.status(403).send({
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
          return res.status(500).send({
            message: 'Error Getting Biller Items. Try again later.'
          });
        }
        if (!error && response.body.ResponseCode === '90000') {
          responseObject = JSON.stringify(response.body.PaymentItemList);
          try {
            finalResponse = JSON.parse(responseObject);

          } catch (e) {
            console.log(e);
          }

          return res.status(200).send(finalResponse);
        }
        //else if there are other error code 900090 etc 

      });
    });
  };
  module.exports.recharge = function(req, res) {
    var biller = req.params.billerId;
    var postBody = req.body;
    async.waterfall([
      function(callback) {
        // function isAuthorizedMiddleware(req, res) {
        User.findOne({
          token: req.headers.token
        }, function(err, user) {
          if (err || !user) {
            return res.status(403).send({
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
        if (error || (response.body.message === 'Invalid Parameters.')) {
          var errorMessage = response.body.message;
          return res.status(500).send({
            message: (response.body.message === 'Invalid Parameters') ? 'Invalid Parameters' :'Error Recharging.'
          });
        }
        if (!error && response.body.ResponseCode === 90000) {
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
            return res.status(200).send(finalResponse);
          });
        } 
      });
    });
  };

  module.exports.pay = function(req, res) {
    var biller = req.params.billerId;
    var postBody = req.body;
    // use app key to get app 
    async.waterfall([
      function(callback) {
        // function isAuthorizedMiddleware(req, res) {
        Apps.findOne({
          //will this work because it is an array of keys
          // key: req.headers.token
        }, function(err, app) {
          if (err || !app) {
            return res.status(403).send({
              message: 'Unauthorised App'
            });
          }
          if (app) {
            callback(null, app);
          }
        });
      }
    ], function(err, app) {
      var url = 'http://pwcproduction.com/api/v1/qt/bills/pay';
      var responseObject;
      var finalResponse;
      var finalError;
      needle.post(url, postBody, function(error, response) {
        if (error || response.body.errors === 'Invalid Parameters') {
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
            return res.status(200).send(finalResponse);
          });

        } else console.log('response errors', response.body);

      });
    });
  };

};
