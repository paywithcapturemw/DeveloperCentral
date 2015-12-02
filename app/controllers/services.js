var express = require('express'),
  mongoose = require('mongoose'),
  needle = require('needle'),
  BillsPayment = require('../models/bills-payment'),
  User = require('../models/user'),
  Apps = require('../models/apps'),
  ServiceCount = require('../models/serviceCount'),
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
          message: 'Unauthorised User'
        });
      }
      if (user) {
        next();
      }
    });
  };

  module.exports.listBillers = function(req, res) {
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
  };

  module.exports.singleBiller = function(req, res) {
    var biller = req.params.billerId;
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
  };
  module.exports.recharge = function(req, res) {
    var postBody = req.body;
    async.waterfall([
      function(callback) {
        Apps.findOne({
          clientId: req.headers.client_id,
          clientSecret: req.headers.client_secret
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
      var url = 'http://pwcproduction.com/api/v1/qt/recharge';
      var responseObject;
      var finalResponse;
      var finalError;
      needle.post(url, postBody, function(error, response) {
        if (error || (response.body.message === 'Invalid Parameters.')) {
          var errorMessage = response.body.message;
          return res.status(500).send({
            message: (response.body.message === 'Invalid Parameters.') ? 'Invalid Parameters.' : 'Error Recharging.'
          });
        }
        if (!error && response.body.ResponseCode === 90000) {
          responseObject = JSON.stringify(response.body.PaymentItemList);
          try {
            finalResponse = JSON.parse(responseObject);
          } catch (e) {
            console.log(e);
          }
          ServiceCount.findOne({
            appId: app._id
          }, function(err, serviceCount) {
            if (err) {
              console.log('error incrementing count');
            }
            if (serviceCount) {
              serviceCount.rechargeCount += 1;
              serviceCount.totalCount += 1;
              serviceCount.save();
              return res.status(200).send(finalResponse);
            }
          });
        } else {
          return res.status(500).send(response.body);
        }
      });
    });
  };

  module.exports.pay = function(req, res) {
    var postBody = req.body;
    async.waterfall([
      function(callback) {
        Apps.findOne({
          clientId: req.headers.client_id,
          clientSecret: req.headers.client_secret
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
        if (error || (response.body.message === 'Invalid Parameters.')) {
          var errorMessage = response.body.message;
          return res.status(500).send({
            message: (response.body.message === 'Invalid Parameters.') ? 'Invalid Parameters.' : 'Error Making Payment.'
          });
        }
        if (!error && response.body.ResponseCode === 90000) {
          responseObject = JSON.stringify(response.body.PaymentItemList);
          try {
            finalResponse = JSON.parse(responseObject);

          } catch (e) {
            console.log(e);
          }
          ServiceCount.findOne({
            appId: app._id
          }, function(err, serviceCount) {
            if (err) {
              console.log('error incrementing count');
            }
            if (serviceCount) {
              serviceCount.paymentCount += 1;
              serviceCount.totalCount += 1;
              serviceCount.save();
              return res.status(200).send(finalResponse);
            }
          });
        } else {
          return res.status(500).send(response.body);
        }

      });
    });
  };

  module.exports.transfer = function(req, res) {
    var postBody = req.body;
    var responseObject;
    var finalResponse;
    async.waterfall([
      function(callback) {
        Apps.findOne({
          clientId: req.headers.client_id,
          clientSecret: req.headers.client_secret
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
      var url = 'http://pwcproduction.com/api/v1/qt/funds/transfer/account';
      needle.post(url, postBody, function(error, response) {
        if (error || (response.body.message === 'Invalid Parameters.')) {
          var errorMessage = response.body.message;
          return res.status(500).send({
            message: (response.body.message === 'Invalid Parameters.') ? 'Invalid Parameters.' : 'Error Recharging.',
            error: (response.body.message === 'Invalid Parameters.') ? response.body.errors : error
          });
        }

        if (!error && response.body.ResponseCode === 90000) {
          responseObject = JSON.stringify(response.body.PaymentItemList);
          try {
            finalResponse = JSON.parse(responseObject);

          } catch (e) {
            console.log(e);
          }
          ServiceCount.findOne({
            appId: app._id
          }, function(err, serviceCount) {
            if (err) {
              console.log('error incrementing count');
            }
            if (serviceCount) {
              serviceCount.transferCount += 1;
              serviceCount.totalCount += 1;
              serviceCount.save();
              return res.status(200).send(finalResponse);
            }
          });
        } else {
          return res.status(500).send(response.body);
        }
        // if (!error) {
        //   console.log(response.body);
        // }
      });
    });
  };

};
