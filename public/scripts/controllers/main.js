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
      // #stateParams
      $scope.selectedRoleIndex = index;
      console.log('index', index);
      $location.url(service.url);

    };

    $scope.datadetails = {
      "firstname": "XXXXXXX",
      "lastname": "XXXXXXXX",
      "email": "XXXXXXXX@yahoo.com",
      "phone": "xxxxxxxxxx",
      "accountnumber": "xxxyxyxxyx",
      "accounttype": "20",
      "bankcode": "XXXXXX"
    };

    var converter = new showdown.Converter(),
      text = '#hello, markdown!',
      html = converter.makeHtml(text);

  }])
  // window.location.replace(redirect);
  //

.filter('htmlToPlaintext', function() {
  return function(text) {
    console.log('text', text);
    var newtext = text ? String(text).replace(/<[^>]+>/gm, '') : '';
    console.log('newtext', newtext);
    return text;
  };
});
