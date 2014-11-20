var myApp = 
angular.module("myApp", ['ngRoute', 'parse-angular'])
.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'RegistryController',
        templateUrl: 'views/RegistryTemplate.html'
    });
});