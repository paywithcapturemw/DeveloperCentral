// var keenIO = require('keen.io'),
//   express = require('express'),
//   mongoose = require('mongoose');
// // Configure instance. Only projectId and writeKey are required to send data.
// var keen = keenIO.configure({
//     projectId: process.env['KEEN_PROJECT_ID'],
//     writeKey: process.env['KEEN_WRITE_KEY']
// });

// keen.addEvent("sign_ups", {"username": "developercentral", "referred_by": "harry"}, function(err, res) {
//     if (err) {
//         console.log("Oh no, an error!");
//     } else {
//         console.log("Hooray, it worked!");
//     }
// });