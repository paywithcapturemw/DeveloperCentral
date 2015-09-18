app.controller('DashboardCtrl', function($scope, $stateParams, $http) {
    $scope.getUser = function() {
        $scope.signedIn = true;
        console.log($stateParams.id);
        $http.get('user/me/' + $stateParams.id).success(function(response){
          $scope.user = response;
        }).error(function(error){
          console.log('error', error);
          $scope.error = error;
        });
    };
  
});
