var app = angular.module('postapp', []);

app.controller('PostListCtrl', function($scope, PostService) {
    $scope.notifyMessage = "Loading posts...";
    $scope.newPost = {};

    PostService.getPostList()
        .then(function(response) {
            $scope.posts = response.data;
            $scope.notifyMessage = "All posts loaded";
        }, function(errorResponse) {
            $scope.notifyMessage = "Could not load posts";
        });

    $scope.createPost = function() {
        $scope.notifyMessage = "Trying to create article...";

        PostService.createPost($scope.newPost)
            .then(function(response) {
                $scope.posts.unshift(response.data);
                $scope.notifyMessage = "Successfully created post.";
                $scope.newPost = {};
            }, function(errorResponse) {
                $scope.notifyMessage = "Could not create post";
            });
    };

    $scope.deletePost = function(post) {
        $scope.notifyMessage = "Will try to delete post #" + post.id;

        PostService.deletePost(post.id)
            .then(function() {
                var index = $scope.posts.indexOf(post);
                $scope.posts.splice(index, 1);
                $scope.notifyMessage = "Successfully deleted post.";
            }, function(errorResponse) {
                $scope.notifyMessage = "Something went wrong";
            });
    };
});

app.service('PostService', function($http) {
    return {
        getPostList: function() {
            return $http.get("http://jsonplaceholder.typicode.com/posts");
        },
        deletePost: function(id) {
            var url = "http://jsonplaceholder.typicode.com/posts/" + id;
            return $http.delete(url);
        },
        createPost: function(data) {
            return $http.post("http://jsonplaceholder.typicode.com/posts/", data);
        }
    };
});
