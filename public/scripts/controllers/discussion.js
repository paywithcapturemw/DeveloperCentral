app.controller('DiscussionsCtrl', ['$scope', '$http', '$location', '$stateParams', '$rootScope', '$localStorage', 'Authentication', 'jwtHelper',
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
    $scope.displaydiscussions = function() {
      $http.get('/discussions').success(function(response) {
          $scope.discussions = response;
        })
        .error(function(errorResponse) {
          $scope.error = errorResponse.data;
        });
    };
    $scope.newDiscussion = function(blog, type) {
      $scope.openDiscussionForm = false;
      var postBody = {
        token: token,
        caption: blog.caption,
        title: blog.title,
        blogContent: blog.blogContent,
        serviceType: type,
        user: $scope.userId
      };
      $http.post('/discussions', postBody).success(function(response) {
          var blogId = response._id;
          $location.url('/community/discussions');
        })
        .error(function(errorResponse) {
          $scope.error = errorResponse.message;

        });
    };



    $scope.singleDiscussion = function() {
      var discussionId = $stateParams.id;
      $http.get('/discussions/' + discussionId).success(function(response) {
          $scope.discussion = response;
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
      $scope.discussion = blog;
      // console.log('discussion', blog);
      $http.post('/discussions/' + blog._id + '/comments', commentBody).success(function(response) {
        $scope.discussion.comments.push(response);
        $location.url('/community/discussion/' + blog._id);
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
      $scope.discussion = blog;

      $http.post('/discussions/' + blog._id + '/like', body).success(function(response) {
        $scope.liked = true;
        $scope.discussion.likes.length = $scope.discussion.likes.length +1;
      }).error(function(errorResponse) {
        $scope.error = errorResponse.data;
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

      $http.post('/discussions/' + blog._id + '/comment/' + comment._id + '/like', postBody).success(function(response) {
        $scope.liked = true;
        $scope.blog = response;
      }).error(function(errorResponse) {
        $scope.error = errorResponse.message;
      });
    };
  }
]);
