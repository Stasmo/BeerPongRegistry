angular.module("myApp").factory( "TeamFactory", function(ParseFactory) {
    TeamFactory.createTeam = function(data) {
      var team = new ParseFactory.Team(data);
      team.save();
    };

    TeamFactory.getTeams = function() {
      var q = new ParseFactory.Parse.Query(ParseFactory.Team);
      return q.find();
    };

    return TeamFactory;
});