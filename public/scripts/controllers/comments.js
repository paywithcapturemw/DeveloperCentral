// Create new Blog
    $scope.createComment = function() {
      // Create new Blog object
      var comment = new Comments ({
        commentContent: this.commentContent,
        blogId: $scope.blog._id
  
      });

      comment.$save(function(response) {
        console.log(response);
        $scope.blog = response;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.commentContent = '';
    };

    $scope.likeBlog = function() {
      console.log('like');
      var like = new Likes({
        blogId: $scope.blog._id,
        choice: 'like'
      });
      console.log('inlike');
      like.$save(function(response){
        $scope.liked = true;
        $scope.blog = response;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;

      });
    };

