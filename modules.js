var myApp = 
angular.module("myApp", ['ngRoute', 'facebook'])
.config(function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'RegistryController',
        templateUrl: 'views/RegistryTemplate.html'
    });
})
.config( function(FacebookProvider) {
  FacebookProvider.init('391576244300983');
})