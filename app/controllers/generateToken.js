var express = require('express');
var router = express.Router();
var randtoken = require('rand-token');

router.get('/', function(req, res){
  console.log('in function');
  var token = randtoken.generate(16);
  console.log('token:', token);
  res.send({'Generated token': token});
});

module.exports = router;

