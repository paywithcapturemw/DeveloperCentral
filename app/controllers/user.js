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

// router.get('/signin', function(req, res) {



// });

module.exports = function(app, config) {
    app.route('/user')
        .post(function(req, res) {
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
};
// 
// 
// }
// module.exports = router;
