app.controller('AdminCtrl', ['$scope', '$http', '$location', '$stateParams', '$rootScope', '$localStorage', 'Authentication', 'jwtHelper',
  function($scope, $http, $location, $stateParams, $rootScope, $localStorage, Authentication, jwtHelper) {
    var token = $localStorage.token;
    $scope.verifyAdmin = function(user) {
      $scope.credentials = {
        username: user.username,
        password: user.password
      };
      $http.put('/user/admin/verifyAdmin', $scope.credentials).success(function(response) {
        $location.url('/admin-user/' + response.data._id + '/changeFirstPassword');
      }).error(function(response) {
        $scope.message = response.data;
      });
    };
    $scope.validatePassword = function() {
      // check password strength
      if (!(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{7,9}$/.test($scope.password))) {
        $scope.changePasswordMessage = 'Password must be between 7 to 9 characters, must contain at least one uppercase letter, one lowercase letter, one special character, one number.';
        return false;
      }

      if ($scope.password != $scope.confirmPassword) {
        $scope.changePasswordMessage = 'The two passwords do not match';
        return false;
      }
      return true;

    };

    $scope.changeFirstPassword = function() {
      $scope.changePasswordMessage = '';
      if (!$scope.validatePassword()) {
        return;
      } else {
        var passwordObject = {
          confirmPassword: $scope.confirmPassword,
          password: $scope.password
        };
        $scope.changePasswordInBackend(passwordObject);
      }
    };

    $scope.changePasswordInBackend = function(passwordObject) {
      $http.put('/user/admin/' + $stateParams.id + '/completeRegistration', passwordObject).success(function(response) {
        console.log('response fnally', response);
        $scope.changePasswordMessage = response.message;
      }).error(function(error) {
        $scope.error = error.message;
      });
    };

    $scope.getAllDevelopers = function() {
      $http.get('/user/admin/' + $stateParams.id + '/getAllDevelopers').success(function(response) {
        $scope.allDevelopers = response.data;
      }).error(function(error) {
        $scope.error = error.message;
      });
    };
    $scope.getAllApps = function() {
      $http.get('/user/admin/' + $stateParams.id + '/getAllApps').success(function(response) {
        $scope.allApps = response.data;
      }).error(function(error) {
        $scope.error = error.message;
      });
    };
    $scope.allServiceCounts = function() {
      $http.get('/user/admin/' + $stateParams.id + '/getAllServiceCounts').success(function(response) {
        console.log('allServiceCounts', response);
        $scope.allServiceCounts = response.data;
      }).error(function(error) {
        $scope.error = error.message;
      });
    };
    $scope.singleAppService = function(appId) {
      $http.get('/user/admin/' + $stateParams.id + '/apps/' + appId + '/singleAppService').success(function(response) {
        $scope.appServiceCount = response.data;
      }).error(function(error) {
        $scope.error = error.message;
      });
    };

    $scope.dashboardTabs = ['DEVELOPERS', 'APPS'];
    $scope.selectedTabIndex = 0;
    $scope.switchTab = function(index){
      $scope.selectedTabIndex = index;
    };
  }
]);


