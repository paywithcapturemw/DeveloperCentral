var http = require('http');
var express = require('express');
var path = require('path');

var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();
var  pem = require('pem');
var config = require('./config/config');

// your express configuration here

var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var multer =require('multer');

var app = express();
var jwt        = require("jsonwebtoken");
var mongoose   = require("mongoose");

var mongoose   = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/DeveloperCentral');
var db = mongoose.connection;
//environments
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'jade');
app.use(logger('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));    // parse application/x-www-form-urlencoded
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());    // parse application/json
app.use(methodOverride());                  // simulate DELETE and PUT

var static_dir = path.join(__dirname + '/public');
app.use(express.static(static_dir)); 

var server = app.listen((process.env.PORT || 8000), function(){
 var host = server.address().address;
 var port = server.address().port;
 console.log('Your app is running on localhost port 8000');
});


var router = express.Router();     // get an instance of the express Router

require('./app/models/discussion');

var generateToken = require("./app/controllers/generateToken");
require('./app/controllers/user')(app);
require('./app/controllers/services')(app, config, router);
require('./app/controllers/apps')(app, config, router);
// require('./app/controllers/apiKey')(app);
require('./app/controllers/admin')(app);
require('./app/controllers/discussion');
require('./app/controllers/blog');




require('./app/routes/apps')(app);
require('./app/routes/services')(app);
require('./app/routes/user')(app);
require('./app/routes/discussion')(app);
require('./app/routes/blog')(app);


var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  
}
