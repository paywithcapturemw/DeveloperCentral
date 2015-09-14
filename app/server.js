var http = require('http');
var express = require('express');
var path = require('path');

var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var multer =require('multer');
var errorHandler = require('errorHandler');

var app = express();
var jwt        = require("jsonwebtoken");
var mongoose   = require("mongoose");

// var mongodb = require('mongodb');
var mongoose   = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/myWork');
var db = mongoose.connection;
//environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));    // parse application/x-www-form-urlencoded
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride());                  // simulate DELETE and PUT
// app.use(multer());
app.use(express.static(path.join(__dirname, '../public'))); 

app.get('*', function(req, res) {
            res.sendfile('../public/index.html'); // load our public/index.html file
        });
var server = app.listen((process.env.PORT || 8000), function(){
 var host = server.address().address;
 var port = server.address().port;
 console.log('Your app is running on localhost port 8000');
});


//var server = http.createServer(app);
// server.listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
var router = express.Router();              // get an instance of the express Router

var generateToken = require("./controllers/generateToken");
var User = require('./controllers/user');

app.use('/generateToken', generateToken);
app.use('/user', User);


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
   //app.use(errorHandler());
}
