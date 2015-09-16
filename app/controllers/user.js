/**
 * Module dependencies.
 */
var express = require('express'),
    // var router = express.Router(),
    //passport = require('passport'),
    mongoose = require('mongoose'),
    User = require('../models/user'),
    jwt = require('jsonwebtoken');
var SECRET = 'shhhhhhared-secret';
// console.log("in users controller backend");
// router.post('/', function(req, res) {
//     console.log("router post");
//     User.findOne({
//         email: req.body.email,
//         username: req.body.username,
//         password: req.body.password
//     }, function(err, user) {
//         if (err) {
//             res.json({
//                 type: false,
//                 data: "Error occured: " + err
//             });
//         } else {
//             if (user) {
//                 res.json({
//                     type: false,
//                     data: "User already exists!"
//                 });
//             } else {
//                 var userModel = new User();
//                 userModel.email = req.body.email;
//                 userModel.password = req.body.password;
//                 userModel.username = req.body.username;
//                 console.log('userModel=', userModel);
//                 userModel.save(function(err, user) {
//                     var token = jwt.sign(user, SECRET);
//                     user.token = token.toString();
//                     console.log('user with token', user);
//                     user.save(function(err, user1) {
//                         res.json({
//                             type: true,
//                             data: user1,
//                             token: user1.token
//                         });
//                     });
//                 });
//             }
//         }
//     });
// });

self.parseJwt = function(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse($window.atob(base64));
}

module.exports = function(app, config) {
    app.route('/user/signUp').post(function(req, res) {
            console.log('usw route');
            User.findOne({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
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
                            var userModel = new User();
                            userModel.email = req.body.email;
                            userModel.password = req.body.password;
                            userModel.username = req.body.username;
                            console.log('userModel=', userModel);
                            userModel.save(function(err, user) {
                                var token = jwt.sign(user, SECRET);
                                user.token = token.toString();
                                console.log('user with token', user);
                                user.save(function(err, user1) {
                                    res.send({
                                        type: true,
                                        data: user1,
                                        token: user1.token
                                    });
                                });
                            });
                        }
                    }

                });

        });

    app.route('/user/signIn').get(function (req, res) {
        if (err || !user) {
                        res.json({
                            type: false,
                            data: "Error occured: " + err
                        });
            } else{

            }
    });
};
// 
// 
// }
// module.exports = router;
