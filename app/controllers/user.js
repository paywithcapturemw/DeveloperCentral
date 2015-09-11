/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router(),
  //passport = require('passport'),
  mongoose   = require('mongoose'),
  User = require('../models/user'),
  jwt = require('jsonwebtoken');
var SECRET = 'shhhhhhared-secret';

router.post('/signup', function(req, res) {
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
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
                console.log('userModel=', userModel);
                userModel.save(function(err, user) {
                    var token = jwt.sign(user, SECRET);
                    user.token = token.toString();
                    console.log('user with token', user);
                    user.save(function(err, user1) {
                        res.json({
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

module.exports = router;