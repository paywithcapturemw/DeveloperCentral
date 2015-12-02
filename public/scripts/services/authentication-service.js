app.factory('Authentication', ['$resource', '$rootScope', '$http', '$localStorage', '$q',
  function($resource, $rootScope, $http, $localStorage, $q) {
    var token = $localStorage.token;
    if (token) {
      var userId = JSON.parse($localStorage.userId).id;
      $rootScope.isloggedin = true;
    }
   
    var ApiRequest = {
      getUser: function() {
        if (token) {
          $http.get('user/me/' + userId).success(function(response) {
            return response;
          }).error(function(error) {
            return error;
          });

        }
        return;
      },
      logOut: function(success) {
        delete $localStorage.token;
        delete $localStorage.userId;
        success();
      },
      currentUser: function() {
        return getUserFromToken();
      }
    };

    function getUserFromToken() {
      if (token) {
        $http.get('user/me/' + userId).success(function(response) {
          return response;
        }).error(function(error) {
          return error;
        });

      }
    }

    function changeUser(user) {
      angular.extend(ApiRequest.currentUser, user);
    }
    return ApiRequest;
  }
]);

