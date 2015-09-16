// app.controller('AuthenticationCtrl', ['$scope', '$http', '$location', 'Authentication',
app.controller('AuthenticationCtrl',
    function($scope, $modalInstance, $http) {
        // $scope.registered= false;

        // $scope.details = details;
        // $scope.register = function(user) {
        //     var user = user;
        //     console.log('uswe', $modalInstance);
        //     // $scope.closeModal();
        //     $scope.registered= true;
        // };

        // $scope.closeModal = function(){
        //      $modalInstance.close({user: $scope.user});
        //                  console.log('uswe', $scope.user);

        //     // $scope.signup($scope.user);

        // };
        
        $scope.register = function(user) {
            // $modalInstance.close({user: $scope.user});
            $scope.signup(user);
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

       


        $scope.signup = function(user) {
            console.log('ysefejdfjfd', user);
            $http.post('/user/signup', user).success(function(response) {
                console.log('response', response);
                //If successful we assign the response to the global user model
                $scope.message = response.message;
                $scope.user = response;
            }).error(function(error) {
                $scope.error = error;
            });
        };



        $scope.loginuser = function(user){
            console.log('login first',user );
            // $modalInstance.close({user: $scope.user});
            // $scope.signin($scope.user);
        };
        $scope.signin = function(user) {
            $scope.credentials = user;
            $http.post('/user/signin', $scope.credentials).success(function(response) {
                //If successful we assign the response to the global user model
                $scope.user = response;
                $scope.errorPresent = false;
                return "User logged in";
            }).error(function(response) {
                $scope.errorPresent = true;
                $scope.error = response.data;
            });
        };
    }
);
