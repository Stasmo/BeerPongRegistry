angular.module("myApp")
.controller('RegistryController', ['$scope', 'UserFactory', function($scope, UserFactory) {
    
    (function(){
    	$scope.userFactory = UserFactory;
    	$scope.registered  = false;
    }())

    $scope.register = function() {
    	var reg = new Registrant();
    	reg.set("name", UserFactory.user.name);
    	reg.set("facebookId", UserFactory.user.id);
    	reg.set("profileThumbnail", UserFactory.user.picture.data.is_silhouette ? "" : UserFactory.user.picture.data.url);
    	reg.save().then(function(){
    		console.log('saved')
    	})
    }
}])