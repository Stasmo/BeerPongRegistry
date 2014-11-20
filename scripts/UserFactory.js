angular.module("myApp").factory("UserFactory", function(ParseFactory) {
    UserFactory = {};
    // Define user empty data :/
    UserFactory.user = {};
    // Defining user loggedIn status
    UserFactory.loggedIn = false;

    /**
    * Login
    */
    UserFactory.login = function() {
      console.log('login')
      ParseFactory.Parse.FacebookUtils.logIn(null, {
        success: function(user) {
          if (!user.existed()) {
          } else {
          }
          UserFactory.user = user;
          UserFactory.loggedIn = true;
        },
        error: function(user, error) {
          alert("User cancelled the Facebook login or did not fully authorize.");
        }
      });
    };

    /**
    * me 
    */
    UserFactory.me = function() {
      FB.api('/me', function(response) {
        UserFactory.user = response;
      });
      FB.api('/me/picture', function(response) {
        UserFactory.picture = response;
      });
    };

    /**
    * Logout
    */
    UserFactory.logout = function() {
      console.log('Logout')
      ParseFactory.Parse.User.logOut(null, {
          success: function() {
              UserFactory.user   = {};
              UserFactory.loggedIn = false;
          },
          error: function(err) {
            alert('logout error');
          }
      });
    };

    UserFactory.init = function() {
    };

    return UserFactory;
});