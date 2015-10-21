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
      $scope.newKey = response.data;
    }).error(function(error) {
      $scope.error = error.data;
    });
  };

  $scope.getApp = function() {

    $http.get('/user/' + $scope.userId + '/app/' + $scope.appId).success(function(response) {
      $scope.app = response.data;
    }).error(function(error) {
      $scope.error = error.data;
    });
  };

  $scope.editApp = function(app) {
   
      var postData = {
      
      };
        // /user/:userId/app/:appId/update
      $http.post('/user/' + $scope.userId + '/app/'+ $scope.appId + '/update' , postData).success(function(response) {
        // $location.url('/user/' + $scope.userId + '/dashboard');

      }).error(function(error) {
        $scope.error = error.data;
      });
  };

  $scope.addKey = function() {
    $http.post('/user/' + $scope.userId + '/addKey').success(function(response) {
      $scope.newKey = response.data;
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


  // $scope.onFileSelect = function($files) {
  //   $scope.files = $files;
  //   $scope.imageFiles = [];
  //   $scope.stringFiles = [];
  //   if ($scope.files) {
  //     for (var i in $scope.files) {
  //       if ($scope.files[0].type === 'application/pdf' || $scope.files[0].type === 'application/msword' || $scope.files[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || $scope.files[i].size < 600000) {
  //         $scope.correctFormat = true;
  //       } else {
  //         alert('error');
  //         alert('Wrong file format...');
  //         $scope.correctFormat = false;
  //       }
  //       $scope.start(i);

  //     }
  //   }
  // };
});
