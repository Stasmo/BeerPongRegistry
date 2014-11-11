angular.module("myApp")
.controller("TeamController", function($scope, TeamFactory) {
	(function(){
		$scope.team = {};
	}());

    $scope.createTeam = function() {
    	//Validate team
    	TeamFactory.createTeam($scope.team);
    }
})