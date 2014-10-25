angular.module("myApp")
.controller('FacebookLoginController', ['$scope', '$timeout', 'Facebook', 'UserFactory',
  function($scope, $timeout, Facebook, UserFactory) {

    $scope.userFactory = UserFactory;

}])