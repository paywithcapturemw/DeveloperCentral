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

// self.parseJwt = function(token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace('-', '+').replace('_', '/');
//     return JSON.parse($window.atob(base64));
// };