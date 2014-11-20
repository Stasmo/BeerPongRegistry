angular.module("myApp")
.controller('RegistryController', ['$scope', 'ParseFactory', function($scope, ParseFactory) {


    /**
    * Alex, Rene, James,
    *
    * Please do not judge me by what you see here. I was in a rush and I didn't
    * really know Angular too well.
    *
    * Love,
    * S
    */

    $scope.logout = function()
    {
        Parse.User.logOut();
        $scope.loggedIn = false;
        $scope.user = {};
    }

    $scope.login = function()
    {
        Parse.FacebookUtils.logIn(null, {
            success: function(facebook) {
                if (!facebook.existed()) {
                    //handle this
                } else {
                    //or this, who cares
                }
                $scope.$apply (function() {
                    $scope.user.parse = Parse.User.current();
                    $scope.user.facebook = facebook;
                    $scope.loggedIn = true;
                    $scope.getUserTeam($scope.user.parse.id);
                });
            },
            error: function(user, error) {
              alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    }
    
    $scope.register = function()
    {
        $scope.user.parse.set('registered', true);
        $scope.user.parse.save({
            success: function() {
                //display a nice message or something
            }
        });
    }

    $scope.createTeam = function()
    {
        var q = new Parse.Query(ParseFactory.Team);
        q.equalTo("name", $scope.teamToCreate.name);
        q.count().then(function(c) {
            if (c > 0) {
                $scope.createError = "Team name already exists";
                console.log('error')
            } else {

                FB.api(
                    "/me/picture",
                    {
                        "redirect": false,
                        "height": "200",
                        "type": "normal",
                        "width": "200"
                    },
                    function (response) {
                        console.log(response)
                      if (response && !response.error) {
                        var myTeam = new ParseFactory.Team($scope.teamToCreate)
                            .set('a', $scope.user.parse.id)
                            .set('aName', $scope.user.facebook.name)
                            .set('aPic', response.data.url)
                            .save()
                            .then(function(){
                                $scope.success = "Created new team '" + myTeam.get('name') + "'"
                            });
                        $scope.user.team = myTeam;
                        $scope.user.needsTeam = false;
                      }
                    }
                );
            }
        });
    }

    $scope.joinTeam = function(team)
    {
        if (team.get('a') == $scope.user.parse.id) {
            $scope.error = "You cannot join your own team";
            return;
        }

        if ($scope.user.team != null) {
            console.log($scope.user.team)
            $scope.error = "You already have a team";
            return;
        }

        FB.api(
            "/me/picture",
            {
                "redirect": false,
                "height": "200",
                "type": "normal",
                "width": "200"
            },
            function (response) {
              if (response && !response.error) {
                team.set('b', $scope.user.parse.id)
                    .set('bPic', response.data.url)
                    .set('bName', $scope.user.facebook.name)
                    .save()
                    .then(function(){
                        $scope.user.team = team;
                        $scope.user.needsTeam = false;
                        $scope.success = "Joined team '" + team.get('name') + "'"
                    });
              }
            }
        );
    }

    $scope.joinTeamByName = function()
    {
        var q = new Parse.Query(ParseFactory.Team);
        q.equalTo("name", $scope.joinTeamName);
        q.find().then(function(res){
            console.log(res)
            if (res.length > 1) {
                $scope.error = "An error ocurred while trying to join the team";
            } else if (res.length == 1) {
                var team = res[0];
                FB.api(
                    "/me/picture",
                    {
                        "redirect": false,
                        "height": "200",
                        "type": "normal",
                        "width": "200"
                    },
                    function (response) {
                      if (response && !response.error) {
                        team.set('b', $scope.user.parse.id);
                        team.set('bPic', response.data.url);
                        team.set('bName', $scope.user.facebook.name);
                        team.save().then(function(){
                            $scope.user.team = team;
                            $scope.user.needsTeam = false;
                            $scope.success = "Joined team '" + team.get('name') + "'"
                        });
                      }
                    }
                );
            } else {
                $scope.error = "Couldn't find that team. Make sure you're using the case. XxXMyTeamXxX will not match xxxmyteamxxx.";
            }
        })
    }

    $scope.leaveTeam = function()
    {
        $scope.user.team.unset('b').unset('bPic').unset('bName').save().then(function(){
            $scope.user.team = null;
            $scope.user.needsTeam = true;
            $scope.success = "Left team"
            $scope.getExistingTeams();
            $scope.getPublicTeams();
        });
    }

    $scope.deleteTeam = function()
    {
        $scope.user.team.destroy().then(function(){
            $scope.user.team = {};
            $scope.user.needsTeam = true;
        });
    }

    $scope.getUserTeam = function(id) {
        var aQuery = new Parse.Query(ParseFactory.Team);
        aQuery.equalTo('a', id);
        var bQuery = new Parse.Query(ParseFactory.Team);
        bQuery.equalTo('b', id);
        var mQuery = Parse.Query.or(aQuery, bQuery);
        mQuery.find().then(function(results){
            console.log(id)
            console.log(results)
            if (results.length > 1) {
                $scope.error = "User is on more than one team";
            } else if (results.length > 0) {
                $scope.user.team = results[0];
            } else {
                $scope.user.team = undefined;
                $scope.user.needsTeam = true;
            }
        });
    }

    $scope.getExistingTeams = function ()
    {
        var q = new Parse.Query(ParseFactory.Team);
        q.exists('b');
        q.find().then(function(res) {
            console.log(1)
            console.log(res)
            $scope.teams = res;
        });
    }

    $scope.getPublicTeams = function ()
    {
        var q = new Parse.Query(ParseFactory.Team);
        var q2 = new Parse.Query(ParseFactory.Team);
        q2.equalTo("b", "");
        q2.equalTo("public", true);
        q.doesNotExist("b");
        q.equalTo("public", true);
        var q3 = Parse.Query.or(q, q2);
        q3.find().then(function(res) {
            console.log(2);
            console.log(res)
            $scope.publicTeams = res;
        });
    }

    $scope.makePublic = function()
    {
        $scope.user.team.set('public', true).save().then(function(){
            $scope.success = "Team made public";
        })
    }

    $scope.makePrivate = function()
    {
        $scope.user.team.set('public', false).save().then(function(){
            $scope.success = "Team made private";
        })
    }


    function init(){
        $scope.loggedIn = false;
        $scope.user = {};
        $scope.teamToCreate = {};
        $scope.getExistingTeams();
        $scope.getPublicTeams();

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected' && Parse.User.current() != null) {
                $scope.loggedIn = true;
                $scope.user.parse = Parse.User.current();
                $scope.getUserTeam($scope.user.parse.id);
                FB.api('/me', function(res){
                    $scope.$apply(function(){
                        $scope.user.facebook = res;
                    })
                })
            }
        });
    };

    init();

}]);