angular.module("myApp")
.config( function() {
    Parse.initialize("kuqd7BoPMkP24oV3jr9RDyzurQwLCJ3CcH7OjHLu", "76CDjNfuHSroUU6V1f4om0sUGjr1TFkN0Vf4auIg");
})
.controller('RegistryController', ['$scope', 'UserFactory', function($scope, UserFactory) {
    
    $scope.userFactory = UserFactory;
    
}])