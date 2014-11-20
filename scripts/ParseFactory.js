angular.module("myApp").factory( "ParseFactory", function() {
	var Factory = {};

    Factory.Team = Parse.Object.extend("Team");

    return Factory;
});