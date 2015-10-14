app.controller('DashboardCtrl', function($scope, $stateParams, $http, $localStorage, $modal, Authentication) {
  // console.log('ueser', Authentication.getUser());
  // 
  $scope.newAppForm = false;
  var userId;
  var token = $localStorage.token;
  if (token) {
    userId = JSON.parse($localStorage.userId).id;
  }else{
    userId = $stateParams.id;
  }

  $scope.getUser = function() {

    $scope.signedIn = true;

    $http.get('user/me/' + userId).success(function(response) {
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

  // $scope.tabForAppViews = ['ADD APP', 'SAMPLE APP'];
  $scope.switchTabForApp = function(index) {
    $scope.selectedTabForApp = index;
  };

  $scope.newApp = function(app) {
    var postData = {
      name: app.name,
      description: app.description,
      key: app.selectedkey
    };
    $http.post('/user/' + userId + '/app/create', postData).success(function(response) {
      $scope.newAppForm = false;

      $scope.newApp = response.data;
    }).error(function(error) {
      $scope.error = error;
    });
  };

  $scope.addAppPage = function() {
    $scope.newAppForm = true;
  };

  $scope.listApps = function() {

    $http.get('/user/' + userId + '/app/listApps').success(function(response) {
      $scope.apps = response.data;
    }).error(function(error) {
      $scope.error = error;
    });
  };

  // /user/:userId/app/:appId/getOneApp
  // /user/:userId/app/:appId/update
  // /user/:userId/app/:appId/delete
  // 
  $scope.deleteApp = function(app, index) {
    console.log('app', index, app);

    $http.delete('/user/' + userId + '/app/' + app._id + '/delete').success(function(response) {
      $scope.newKey = response.data;
    }).error(function(error) {
      $scope.error = error;
    });
  };
  $scope.addKey = function() {
    $http.post('/user/' + userId + '/addKey').success(function(response) {
      $scope.newKey = response.data;
    }).error(function(error) {
      $scope.error = error;
    });
  };



  $scope.listKeys = function() {
    $http.get('/user/' + userId + '/Keys').success(function(response) {
      $scope.userKeys = response.data;
    }).error(function(error) {
      $scope.error = error;
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
