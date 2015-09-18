/**
 * Module dependencies.
 */
var express = require('express'),
    mongoose = require('mongoose'),
    User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcryptjs'),
    slugid = require('slugid'),
    bcryptjs = require('bcrypt-nodejs'),
    nodemailer = require('nodemailer');


var genToken = function() {
    var regex = new RegExp('/', 'g');
    return bcryptjs.genSaltSync(8).toString('hex').replace(regex, '');
};

var sendVerifyEmail = function(req, res, user) {
    var adminMail = 'Pay With Capture <oladimeji.olajumoke@paywithcapture.com>';
    var transporter = nodemailer.createTransport();
    var url = 'http://' + req.headers.host + '/user/verify/' + user.verifyEmailToken;

    var mailBody = {
        from: adminMail,
        to: user.email,
        subject: 'Verify Email',
        html: "Hi " + user.username + ",<br><br>Please visit this url to verify your email: <br>" + "<a href= '" + url + "'>" + url + "</a><br><br>" + "Regards, <br><i>Pay With Capture.</i>"
    };
    transporter.sendMail(mailBody, function(err, message) {
        if (err) {
            console.log('err', err);
            return res.status(400).json(err);
        } else {
            return res.status(200).json({
                message: 'An email has been sent to ' + user.email + ' with further instructions.',
                user: user
            });
        }
    });
};

module.exports = function(app, config) {
    app.route('/user/signup').post(function(req, res) {
        var token = genToken();
        var tokenExpires = Date.now() + 3600000;
        User.findOne({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            },
            function(err, user) {
                if (err) {
                    console.log('err', err);
                    res.json({
                        type: false,
                        data: "Error occured: " + err
                    });
                } else {
                    if (user) {
                        console.log('err user presenst');
                        res.json({
                            type: false,
                            data: "User already exists!"
                        });
                    } else {

                        var userModel = new User();
                        userModel.verifyEmailToken = token;
                        userModel.verifyEmailTokenExpires = tokenExpires;
                        userModel.email = req.body.email;
                        userModel.username = req.body.username;
                        userModel.password = bcrypt.hashSync(req.body.password, 12);
                        userModel.token = bcrypt.genSaltSync(20);

                        userModel.save(function(err, user) {
                            if (err) {
                                res.status(400).json({
                                    type: false,
                                    data: "Error occured: " + err
                                });
                            } else {
                                sendVerifyEmail(req, res, user);

                            }
                        });
                    }
                }

            });
    });


    app.route('/user/verify/:token').get(function(req, res) {
        User.findOne({
            verifyEmailToken: req.params.token,
            verifyEmailTokenExpires: {
                $gt: Date.now()
            }
        }, function(err, user) {
            if (!user) {
                return res.redirect('/#/verify/email/invalid');
            }
            if (user) {
                user.verified = true;
                user.verifyEmailToken = undefined;
                user.verifyEmailTokenExpires = undefined;

                user.save(function(err, resp) {
                    if (err) {
                        return res.status(400).json(err);
                    } else {
                        var filteredUser = {
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                            createdAt: user.createdAt,
                            verified: user.verified
                        };
                        res.redirect('/#/auth/' + user._id);
                    }
                });
            }
        });
    });
    /**
     * Signin
     */

    app.route('/user/signin').post(function(req, res) {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({
                message: 'Please fill out all fields'
            });
        } else {
            userPassword = req.body.password;
            User.findOne({
                    username: req.body.username
                },
                function(err, user) {
                    if (user && bcrypt.compareSync(userPassword, user.password)) {
                        res.status(200).send({
                            data: user
                        });

                    } else if (err || !user) {
                        var message = !user ? "User not found" : err;
                        var status = !user ? 401 : 500;

                        res.status(status).send({
                            type: false,
                            data: "Error occured: " + message
                        });

                    }
                });
        }
    });

    /**
     * Signout
     */
    app.route('/user/signout').get(function(req, res) {
        req.logout();
        res.redirect('/');
    });

    //user details
    app.route('/user/id').get(function(req, res) {
        var userId = req.body.id;
        User.findOne({
            id: userId
        }, function(err, user) {
            if (user) {

            }
            if (err || !user) {
                var message = !user ? "User not found" : err;
                var status = !user ? 401 : 500;

                res.status(status).send({
                    type: false,
                    data: "Error occured: " + message
                });
            }

        });
    });


    app.route('/user/forgotpassword').post(function(req, res) {
        console.log('from password')
        var userEmail = req.body.email;
        var token = genToken();
        if (userEmail) {
            User.findOne({
                email: userEmail
            }, function(err, user) {
                if (err) {
                    console.log('err', err);
                    return res.status(400).json(err);
                }
                if (!user) {
                    return res.status(400).send({
                        message: 'No account with that email has been found'
                    });
                } else {
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000;
                    user.save(function(err, resp) {
                        if (err) {
                            console.log('err in subject', err);
                            return res.status(400).json(err);
                        } else {
                            var userMail = resp.email;
                            var userName = resp.username;
                            var adminMail = 'Pay With Capture <oladimeji.olajumoke@paywithcapture.com>';
                            var transporter = nodemailer.createTransport();
                            var url = 'http://' + req.headers.host + '/reset/' + token;
                            var mailBody = {
                                from: adminMail,
                                to: userMail,
                                subject: 'password reset',
                                html: "<div style='text-align:justify'>Hi " + userName + ", \n Please visit this url to reset your password: " + "<a href= '" + url + "'>" + url + "</a>"
                            };
                            transporter.sendMail(mailBody, function(err, message) {
                                if (err) {
                                    return res.status(400).json(err);
                                } else {
                                    res.status(200).send({
                                        msg: 'success'
                                    });

                                }
                            });
                        }
                    });
                }
            });
        }
    });


    app.route('/reset/:token').get(function(req, res) {
        console.log('resettoken check');
        User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        }, function(err, user) {
            if (!user) {
                console.log('err', err);
                return res.redirect('/#/password/reset/invalidToken');
            }
            res.redirect('/#/password/reset/' + req.params.token);
        });
    });

    app.route('/user/changePassword/:token').post(function(req, res, next) {
        var passwordDetails = req.body;
        if (passwordDetails.password === passwordDetails.confirmPassword) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }, function(err, user) {

                if (user) {
                    console.log('user found');
                    user.password = bcrypt.hashSync(passwordDetails.password, 12);
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    user.save(function(err, resp) {
                        if (err) {
                            console.log('error saving user');
                            return res.status(400).json(err);
                        } else {
                            return res.status(200).json(resp);
                        }
                    });
                } else {
                    return res.redirect('/#/password/reset/invalidToken');
                }
            });
        } else {
            res.status(400).send({
                message: 'Password does not match'
            });

        }

    });

    app.route('/user/me/:userId').get(function(req, res) {
        User.findOne({
            _id: req.params.userId
        }, function(err, user) {
            if (user) {
                return res.status(200).json(user);
            } else if (err || !user) {
                var message = !user ? "User not found" : err;
                var status = !user ? 401 : 500;

                res.status(status).send({
                    type: false,
                    data: "Error occured: " + message
                });

            }
        });
    });


};
