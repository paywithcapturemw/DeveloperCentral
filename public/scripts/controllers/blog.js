app.controller('BlogsCtrl', ['$scope', '$http', '$location', '$stateParams', '$rootScope', '$localStorage', 'Authentication', 'jwtHelper',
  function($scope, $http, $location, $stateParams, $rootScope, $localStorage, Authentication, jwtHelper) {
    var token = $localStorage.token;
    if (token) {
      $scope.signedIn = true;
      $scope.userId = JSON.parse($localStorage.userId).id;
    }
    $scope.openDiscussionForm = false;
    $scope.openForm = function() {
      $location.url('/create-API-Discussion');
      $scope.openDiscussionForm = true;
    };
    $scope.displayBlogs = function() {
      $http.get('/blogs').success(function(response) {
          $scope.blogs = response;
        })
        .error(function(errorResponse) {
          $scope.error = errorResponse.data;
        });
    };
    $scope.newBlog = function(blog, type) {
      $scope.openDiscussionForm = false;
      var postBody = {
        token: token,
        caption: blog.caption,
        title: blog.title,
        blogContent: blog.blogContent,
        serviceType: type,
        user: $scope.userId
      };
      $http.post('/blogs', postBody).success(function(response) {
          var blogId = response._id;
          $location.url('/discussion/' + blogId);
        })
        .error(function(errorResponse) {
          $scope.error = errorResponse.message;

        });
    };



    $scope.singleBlog = function() {
      var blogId = $stateParams.id;
      $http.get('/blogs/' + blogId).success(function(response) {
          $scope.blog = response;
        })
        .error(function(errorResponse) {
          $scope.error = errorResponse.data;
        });
    };

    $scope.deleteBlog = function() {

    };

    // Create new Blog
    $scope.createComment = function(blog) {
      // Create new Blog object
      var commentBody = {
        token: token,
        comment: {
          commentContent: this.commentContent,
          creator: $scope.userId
        }
      };

      $http.post('/blogs/' + blog._id + '/comments', commentBody).success(function(response) {
        $location.url('/discussion/' + blog._id);
      }).error(function(errorResponse) {
        $scope.error = errorResponse.message;
      });
      // Clear form fields
      this.commentContent = '';
    };

    $scope.likeBlog = function(blog) {
      var body = {
        token: token,
        blog: blog,
        userId: $scope.userId,
        like: {
          liker: $scope.userId
        }
      };
      $http.post('/blogs/' + blog._id + '/like', body).success(function(response) {
        $scope.liked = true;
        $scope.blog = response;
      }).error(function(errorResponse) {
        $scope.error = errorResponse.message;
      });
    };

    $scope.likeComment = function(blog, comment) {
      var postBody = {
        token: token,
        blog: blog,
        userId: $scope.userId,
        like: {
          liker: $scope.userId
        }
      };

      $http.post('/blogs/' + blog._id + '/comment/' + comment._id + '/like', postBody).success(function(response) {
        $scope.liked = true;
        $scope.blog = response;
      }).error(function(errorResponse) {
        $scope.error = errorResponse.message;
      });
    };
  }
]);
