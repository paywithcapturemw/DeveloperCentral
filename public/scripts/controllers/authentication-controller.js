// app.controller('AuthenticationCtrl', ['$scope', '$http', '$location', 'Authentication',
app.controller('AuthenticationCtrl',
    function($scope, $modalInstance, $http) {


        // $scope.details = details;
        $scope.register = function() {
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
            $http.post('/user/signup', user).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.user = response;
            }).error(function(error) {
                $scope.error = error;
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
