var express = require('express');
var router = express.Router();

console.log('in comtroller')
var randtoken = require('rand-token');


// app.route('/token')
//   .get(function(req, res) {
//     console.log('in function');
//     var token = randtoken.generate(16);
//     console.log('token:', token);
//     res.send({'Generated token': token});
//   })
//   .post(function(req, res) {
//     res.send('Add a book');
//   })
//   .put(function(req, res) {
//     res.send('Update the book');
//   });
//
//
//


//   For a middleware specifi to this router   
//router.use(function restrcit(req, res, next){
//console.log('restrict peeople');
//next();
//})

router.get('/', function(req, res){
  console.log('in function');
  var token = randtoken.generate(16);
  console.log('token:', token);
  res.send({'Generated token': token});
});

module.exports = router;