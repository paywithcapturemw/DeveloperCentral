app.controller('AuthenticationCtrl', ['$scope', '$http', '$location', '$stateParams', '$rootScope', '$localStorage', 'Authentication', 'jwtHelper',
  function($scope, $http, $location, $stateParams, $rootScope, $localStorage, Authentication, jwtHelper) {
    var token = $localStorage.token;

    if (token) {
      $scope.signedIn = true;
      $scope.userId = JSON.parse($localStorage.userId).id;
      $http.get('user/me/' + $scope.userId).success(function(response) {
        $scope.user = response;
      }).error(function(error) {
        $scope.error = error;
      });

    }

    $scope.register = function() {
      $scope.signupMessage = '';
      if (!$scope.validate()) {
        return;
      }
      var user = {
        email: $scope.email,
        password: $scope.password,
        username: $scope.username
      };
      $scope.signup(user);
    };


    $scope.validate = function() {

      // check for empty registration params
      if (!$scope.username || !$scope.email || !$scope.password) {
        $scope.signupMessage = 'All fields are required.';
        return false;
      }

      // check if username is up to 5 characters
      if ($scope.username.length < 5) {
        $scope.signupMessage = 'Username must have a minimum of 5 characters.';
        return false;
      }
      // check if valid email was entered
      if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.email))) {
        $scope.signupMessage = 'Please enter a valid email.';
        return false;
      }
      // check password strength
      if (!(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{7,9}$/.test($scope.password))) {
        $scope.signupMessage = 'Password must be between 7 to 9 characters, must contain at least one uppercase letter, one lowercase letter, one special character, one number.';
        return false;
      }

      return true;
    };

    $scope.signup = function(user) {
      $http.post('/user/signup', user).success(function(response) {
        //If successful we assign the response to the global user model
        $scope.signupMessage = response.message;
        $scope.user = response;
      }).error(function(error) {
        console.log('error', error);
        $scope.signupMessage = "Registration not successful";
        return false;
      });
    };


    $scope.signin = function(user) {
      if(token || $localStorage.userId){
        $scope.message = '2 users can\'t be logged in at once.';
        return;
      }
      $scope.credentials = user;
      $http.post('/user/signin', $scope.credentials).success(function(response) {
        //If successful we assign the response to the global user model
        $rootScope.user = response.data;
        $rootScope.isloggedin = true;
        var userObj = {
          id: response.data._id,
          token: response.signintoken
        };


        $scope.user.username = '';
        $scope.user.password = '';
        $localStorage.token = response.signintoken;
        $localStorage.userId = JSON.stringify(userObj);
        
        if($rootScope.user.role === 'developer'){
          $location.url('/user/' + $rootScope.user._id + '/dashboard');
        }
        if($rootScope.user.role === 'admin'){
          $location.url('/admin-user/' + $rootScope.user._id + '/dashboard');
        }
      

      }).error(function(response) {
        $scope.message = response.data;
      });

    };
    $scope.getUser = function() {
      $scope.signedIn = true;
      $http.get('user/me/' + $stateParams.id).success(function(response) {
        $scope.user = response;
      }).error(function(error) {
        $scope.error = error;
      });
    };
    $scope.editUser = function(user) {
      $http.put('/user/me/' + $stateParams.id + '/edit', user)
        .success(function(response) {
          $location.url('/user/' + $stateParams.id + '/profile');
        }).error(function(error) {
          $scope.error = error.data;
        });
    };

    $scope.resetpassword = function() {
      var stringedEmail = JSON.stringify({
        email: $scope.email
      });
      var email = JSON.parse(stringedEmail);
      $http.post('/user/forgotpassword', email).success(function(response) {
        $location.url('/verify/email/success');
      }).error(function(error) {
        $scope.error = error.data;
      });
    };

    $scope.validatePassword = function() {
      // check password strength
      if (!(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{7,9}$/.test($scope.password))) {
        $scope.forgotMessage = 'Password must be between 7 to 9 characters, must contain at least one uppercase letter, one lowercase letter, one special character, one number.';
        return false;
      }
      if ($scope.password != $scope.confirmPassword) {
        $scope.forgotMessage = 'The two passwords do not match';
        return false;
      }
      return true;

    };

    $scope.changePassword = function() {
      $scope.changePasswordMessage = '';
      if (!$scope.validatePassword()) {
        return;
      }
      var passwordWithTokenObject = {
        confirmPassword: $scope.confirmPassword,
        password: $scope.password,
        token: $stateParams.token
      };
      $scope.changePasswordInBackend(passwordWithTokenObject);
    };

    $scope.changePasswordInBackend = function(passwordWithTokenObject) {
      var token = passwordWithTokenObject.token;
      var passwordObject = {
        confirmPassword: passwordWithTokenObject.confirmPassword,
        password: passwordWithTokenObject.password
      };
      $http.post('/user/changePassword/' + token, passwordObject).success(function(response) {
        $location.url('/signin');
      }).error(function(error) {
        $scope.error = error.message;
      });
    };


    $scope.signout = function() {
      $http.get('/user/signout').success(function(response) {
        $rootScope.isloggedin = false;
        delete $localStorage.token;
        delete $localStorage.userId;
        $location.url('/');
      });
    };

    if (token) {
      var bool = jwtHelper.isTokenExpired(token);
      var date = jwtHelper.getTokenExpirationDate(token);
      if (bool || (date <= new Date())) {
        $scope.signout();
      }
    }

  }
]);
