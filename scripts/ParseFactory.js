angular.module("myApp").factory( "ParseFactory", function() {
    Parse.initialize("kuqd7BoPMkP24oV3jr9RDyzurQwLCJ3CcH7OjHLu", "76CDjNfuHSroUU6V1f4om0sUGjr1TFkN0Vf4auIg");

    Parse.Registrant = Parse.Object.extend("Registrant"),
    Parse.Team       = Parse.Object.extend("Team");

    return Parse;
});