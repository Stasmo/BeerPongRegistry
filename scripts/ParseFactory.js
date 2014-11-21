angular.module("myApp").factory( "ParseFactory", function() {
	var Factory = {};

    Factory.Team = Parse.Object.extend("Team");
    Factory.User = Parse.Object.extend("User");

    return Factory;
});