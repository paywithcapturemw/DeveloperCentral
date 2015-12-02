var services = require('../../app/controllers/services'),
  apiKey = require('../../app/controllers/apiKey');

var express = require('express'),
  mongoose = require('mongoose');


module.exports = function(app) {
  app.route('/api/v1/qt/billers')
    .get(services.listBillers);
  app.route('/api/v1/qt/billers/:billerId/payitems')
    .get(services.listBillers);
  app.route('/api/v1/qt/recharge')
    .post(services.hasAuthorization, services.recharge);
  app.route('/api/v1/qt/bills/pay')
    .post(services.hasAuthorization, services.pay);
  app.route('/api/v1/qt/funds/transfer/account')
    .post(services.hasAuthorization, services.transfer);
};
