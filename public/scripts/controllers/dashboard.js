app.controller('DashboardCtrl', function($scope, $stateParams, $http) {
    $scope.getUser = function() {
        $scope.signedIn = true;
        $http.get('user/me/' + $stateParams.id).success(function(response){
          $scope.user = response;
        }).error(function(error){
          $scope.error = error;
        });
    };
  
});
