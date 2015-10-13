// // URL: http: //pwcproduction.com/api/v1/qt/bills/pay
// //   METHOD: POST
// // PARAMETERS:
// //   amount: (required) the bill amount to pay
// // phone: (required) the customer / user 's phone number
// // email: (required) the customer / user 's email address
// // paymentcode: (required) the paymentcode of the sunscriber network as returned from the GetBillerPaymentItems response from interswitch
// // customerid: (required) the customer Id of the receiving merchant as returned from Interswitch

// var express = require('express'),
//   mongoose = require('mongoose'),
//   needle = require('needle'),
//   BillsPayment = require('../../models/bills-payment'),
//   _ = require('lodash');


// module.exports = function(app) {


//   app.route('/api/makeBillPayment').post(function(req, res) {
//     console.log('in next');
//     var url = 'http://pwcproduction.com/api/v1/qt/bills/pay';
//     var data = req.body;
//     var successMessage = 'Bill payment with' + data.amount + 'successful';
//     var errorMessage = 'Successful but the details not saved';
//     needle.post(url, data, function(error, response) {
//       if (error) {
//         res.status(500).send({
//           message: error
//         });
//       }
//       if (!error && response.statusCode == 200) {
//         // res.status(200).send({
//         //   data: responseObj.booking
//         // });
//       }
//     });
    
//     BillsPayment.save(data, function(err) {
//       if (err) {
//         res.send({
//           data: err,
//           message: errorMessage
//         });
//       }
//       res.send({
//         message: successMessage
//       });
//     });
//   });
// };
