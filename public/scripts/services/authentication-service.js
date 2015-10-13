app.factory('Authentication', ['$resource', '$rootScope', '$http', '$localStorage',
  function($resource, $rootScope, $http, $localStorage) {
    var token = $localStorage.token;
    if (token) {
      var userId = JSON.parse($localStorage.userId).id;

      $rootScope.isloggedin = true;

    }

    var ApiRequest = {
      getUser : function() {
        if(token){
          $http.get('user/me/' + userId).success(function(response) {
            // console.log('get user response', response);
            return response;
          }).error(function(error) {
            return error;
          });
          
        }
        return;
          // $scope.signedIn = true;
        },
        // signUp: function(user) {
        //   return $http.post(BASE_URL + 'signup', user);
        // },
        // signIn: function(user, success, error) {
        //   return $http.post(BASE_URL + 'signin', user);
        // },
        logOut: function(success) {
          // changeUser({});
          delete $localStorage.token;
          success();
        },
        currentUser: function() {
          return getUserFromToken();
        }
        // updateUser: function(user, success, error) {
        // return $http.put(BASE_URL + 'user/' + user._id, user);
        // }
    };

    function getUserFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
        var encoded = token.split('.')[1];
        // user = JSON.parse(urlBase64Decode(encoded));
      }
      return user;
    }

    function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
        case 0:
          break;
        case 2:
          output += '==';
          break;
        case 3:
          output += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      return window.atob(output);
    }

    function changeUser(user) {
      angular.extend(ApiRequest.currentUser, user);
    }
    return ApiRequest;
  }
]);
