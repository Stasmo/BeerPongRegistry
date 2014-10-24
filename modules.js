var myApp = 
angular.module("myApp", ['ngRoute'])

.controller('TitleController', function($scope) {
    $scope.team = {};

    $scope.registerTeam = function() {

    }
})

.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'TitleController',
        templateUrl: 'views/myTemplate.html'
    });
});