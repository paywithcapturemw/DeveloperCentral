// app.controller('AuthenticationCtrl', ['$scope', '$http', '$location', 'Authentication',
app.controller('AuthenticationCtrl',
    function($scope, $modalInstance, $http) {


        // $scope.details = details;
        $scope.register = function() {
            console.log("user details is =",$scope.user);
            $modalInstance.close({user: $scope.user});
            $scope.signup($scope.user);
        };
 // $modalInstance.close({ changeRows : $scope.rows, changeType : $scope.typeFormatted, changeValue : $scope.newValue,  batchData: $scope.batchData, reason: $scope.reason });
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };


        // $scope.items = items;
        // $scope.selected = {
        //     item: $scope.items[0]
        // };

        // $scope.ok = function() {
        //     $modalInstance.close($scope.selected.item);
        // };

        // $scope.cancel = function() {
        //     $modalInstance.dismiss('cancel');
        // };


        // $scope.authentication = Authentication;
        $scope.signup = function(user) {
            $http.post('/user', user).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.user = response;
                console.log('user=',$scope.user);
                //And redirect to the index page
                // $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };


        // $scope.signin = function() {
        //     $http.post('/auth/signin', $scope.credentials).success(function(response) {
        //         //If successful we assign the response to the global user model
        //         $scope.authentication.user = response;
        //     }).error(function(response) {
        //         $scope.error = response.message;
        //     });
        // };
    }
);