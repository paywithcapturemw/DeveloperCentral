app.controller('MainCtrl',function($scope, $stateParams){
  $scope.services = [
    {
     title: "Airtime Purchase",
     about:"This API allows people recharge their mobile phones from their devices",
     image:"",
     moreInfoLink:"" 
    },{
      title: "Transfer",
     about:"Poeple who want to transfer money from their bank accounts, money wallets can use this.",
     image:"",
     moreInfoLink:"" 
    },{
      title: "Payment",
     about:"This API is for bill or retail purchase payments",
     image:"",
     moreInfoLink:"" 
    }
  ];
 // routeParams {"_id":"55fad431b6ef4e446f4bae5d","token":"$2a$20$kFeKr3mpN22nlwlNWtE5.e","username":"jumoke","__v":0,"verifyEmailToken":"$2a$08$LBCrTe.NOcnpHqC8nPptb.","verifyEmailTokenExpires":"1442505281340","role":"developer","password":"$2a$12$9VsGGqPxKJ2tYS2PvHdyhOgRLg.BK.gtaXPAsKLZfjkf0ZkxEyM8.","email":"jumoke5ng@yahoo.com"}
});

