var app = angular.module('myfirstapp', []);

app.service('UserService', function() {
    return {
        getAllUsers: function() {
            return [{
                firstName: "Mike",
                lastName: "Tyson",
                jobTitle: "Fighter",
                age: 26
            }, {
                firstName: "Mohammed",
                lastName: "Hammoud",
                jobTitle: "Webdeveloper",
                age: 50
            }, {
                firstName: "Jet",
                lastName: "Lee",
                jobTitle: "Actor",
                age: 53
            }, {
                firstName: "Hiro",
                lastName: "Nakamura",
                jobTitle: "CEO of Yamagato Industries",
                age: 24
            }];
        }
    };
});

app.controller('UserController', function($scope, UserService) {
    $scope.users = UserService.getAllUsers();
    $scope.newUser = {};

    $scope.addUser = function() {
        $scope.users.unshift($scope.newUser);
        $scope.newUser = {};
    };

    $scope.removeUser = function(user) {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
    };
});

app.directive('userDetails', function() {
    return {
        template: "<strong>First name:</strong> {{user.firstName}} <button type='button' ng-click='removeUser(user);'>Remove user</button><br/> <strong> Last name: </strong> {{user.lastName}}<br/> <strong> Job title: </strong> {{ user.jobTitle }}<br/> <strong> Age: </strong> {{ user.age }}<br/><br/>"
    };
});
