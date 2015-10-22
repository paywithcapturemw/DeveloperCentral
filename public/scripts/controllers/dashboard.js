app.controller('DashboardCtrl', function($rootScope, $scope, $stateParams, $http, $localStorage, $modal, $location, Authentication) {
  // 
  $scope.newAppForm = false;
  var token = $localStorage.token;
  if (token) {
    $scope.userId = JSON.parse($localStorage.userId).id;
  } else {
    $scope.userId = $stateParams.id;
  }
  //for single app page
  $scope.appId = $stateParams.appId;
  $scope.getUser = function() {

    $scope.signedIn = true;

    $http.get('user/me/' + $scope.userId).success(function(response) {
      $scope.user = response;
    }).error(function(error) {
      $scope.error = error;
    });
  };

  $scope.selectedIndex = 0;
  $scope.selectedTabForApp = 0;

  $scope.tabViews = ['MY APPS', 'MY KEYS'];
  $scope.switchTab = function(index) {
    $scope.selectedIndex = index;
  };

  $scope.switchTabForApp = function(index) {
    $scope.selectedTabForApp = index;
  };

  $scope.newApp = function(app) {
    $scope.emptyDataMessage = "";

    if (!$scope.checkData(app)) {
      return;
    } else {
      var postData = {
        name: app.name,
        description: app.description
      };

      $http.post('/user/' + $scope.userId + '/app/create', postData).success(function(response) {
        $location.url('/user/' + $scope.userId + '/dashboard');

      }).error(function(error) {
        $scope.error = error.data;
        if (error.data === 'Duplicate Name') {
          $scope.message = 'Duplicate Name';
        }
      });
    }
  };

  $scope.checkData = function(app) {
    // check for empty fields
    if (!app.name || !app.description) {
      $scope.emptyDataMessage = 'All fields are required.';
      return false;
    }
    return true;
  };

  $scope.addAppPage = function() {
    $scope.newAppForm = true;
  };

  $scope.listApps = function() {

    $http.get('/user/' + $scope.userId + '/app/listApps').success(function(response) {
      $scope.apps = response.data;
    }).error(function(error) {
      $scope.error = error.data;
    });
  };
  $scope.deleteApp = function(app, apps, index) {
    apps.splice(index, 1);
    $http.delete('/user/' + $scope.userId + '/app/' + app._id + '/delete').success(function(response) {
      $scope.response = response.data;
    }).error(function(error) {
      $scope.error = error.data;
    });
  };

  $scope.getApp = function() {

    $http.get('/user/' + $scope.userId + '/app/' + $scope.appId)
      .success(function(response) {
        $scope.app = response.data;
      }).error(function(error) {
        $scope.error = error.data;
      });
  };

  $scope.updateApp = function(app) {
    $http.put('/user/' + $scope.userId + '/app/' + $scope.appId + '/update', app)
      .success(function(response) {
        $location.url('/user/' + $scope.userId + '/dashboard/app/' + $scope.appId);
      }).error(function(error) {
        $scope.error = error.data;
      });
  };

  $scope.addKey = function(app) {
    $http.post('/user/' + $scope.userId + '/app/' + $scope.appId + '/addKey')
      .success(function(response) {
      app.key.unshift(response.data);
      }).error(function(error) {
        $scope.error = error.data;
      });
  };

  $scope.deleteKey = function(key, keys, index) {
    keys.splice(index, 1);
    $http.delete('/user/' + $scope.userId + '/app/' + $scope.appId + '/key/' + key._id + '/deleteKey')
      .success(function(response) {
        $scope.response = response.data;
      }).error(function(error) {
        $scope.error = error.data;
      });
  };

  $scope.listKeys = function() {
    $http.get('/user/' + $scope.userId + '/Keys').success(function(response) {
      $scope.userKeys = response.data;
    }).error(function(error) {
      $scope.error = error.data;
    });
  };

});
