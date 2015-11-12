// app.factory('TokenInterceptor',['$resource', '$rootScope', '$http', '$localStorage', '$q',
//   function($resource, $rootScope, $http, $localStorage, $q) {
//     var token = $localStorage.token;
//     if (token) {
//       var userId = JSON.parse($localStorage.userId).id;
//       $rootScope.isloggedin = true;
//     }
//   return {
//     request: function(config) {
//         if (token) {
//           console.log('in config request');
//           config.headers['X-Access-Token'] = token;
//           // config.headers['X-Key'] = $localStorage.userId;
//           config.headers['Content-Type'] = "application/json";
//         }
//         return config || $q.when(config);
//       },

//       response: function(response) {
//         return response || $q.when(response);
//       }
//   };
// }]);