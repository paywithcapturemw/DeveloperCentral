var services = require('../../app/controllers/services'),
    apiKey = require('../../app/controllers/apiKey');

var express = require('express'),
  mongoose = require('mongoose');

  
module.exports = function(app) {
     // app.route('/api/v1/qt/billers')
     //  .get(services.hasAuthorization, services.listBillers);

     //   app.route('/api/v1/qt/billers/:billerId/payitems')
     //  .get(services.hasAuthorization, services.listBillers);


// add login check for these end points
// (users.requiresLogin
      //  app.route('/api/v1/qt/recharge')
      // .post(services.hasAuthorization, services.recharge);
      // app.route('/api/v1/qt/bills/pay')
      // .post(services.hasAuthorization, services.pay);
};

