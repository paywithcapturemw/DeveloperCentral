app.controller('HeaderCtrl',function($scope, $modal){
   $scope.openRegistrationModal = function () {
    $modal.open({
      size: 'lg',
      templateUrl: 'views/partials/register-modal.html',
      controller: 'AuthenticationCtrl'
    });
  };
});

