app.controller('MainCtrl', ['$scope', '$stateParams', '$state', '$location', function($scope, $stateParams, $state, $location) {
    var currentService = $state;
    // use lodash
    $scope.services = [{
      title: "Airtime Purchase",
      about: "This API allows people recharge their mobile phones from their devices",
      image: "",
      moreInfoLink: "",
      url: "/airtime-purchases-APIdocumentation"
    }, {
      title: "Transfer",
      about: "Poeple who want to transfer money from their bank accounts, money wallets can use this.",
      image: "",
      moreInfoLink: "",
      url: "/transfers-APIdocumentation"
    }, {
      title: "Payment",
      about: "This API is for bill or retail purchase payments",
      image: "",
      moreInfoLink: "",
      url: "/payments-APIdocumentation"
    }];
    $scope.switchDoc = function(index, service) {
      $scope.selectedRoleIndex = index;
      console.log('index', index);
      $location.url(service.url);
    };

  }]);