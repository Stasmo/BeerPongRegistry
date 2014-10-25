angular.module("myApp").factory( "UserFactory", function(Facebook) {
    UserFactory = {};
    // Define user empty data :/
    UserFactory.user = {};

    // Defining user loggedIn status
    UserFactory.loggedIn = false;

    /**
    * Login
    */
    UserFactory.login = function() {
      Facebook.login(function(response) {
        if (response.status == 'connected') {
          UserFactory.loggedIn = true;
          UserFactory.me();
        }
      });
    };

    /**
    * me 
    */
    UserFactory.me = function() {
      Facebook.api('/me', function(response) {
        UserFactory.user = response;
      });
    };

    /**
    * Logout
    */
    UserFactory.logout = function() {
      Facebook.logout(function() {
          UserFactory.user   = {};
          UserFactory.loggedIn = false;
      });
    }

    (function(){
        Facebook.getLoginStatus(function(response) {
          if (response.status == 'connected') {
            UserFactory.loggedIn = true;
            UserFactory.me();
          }
        });
    }());

    return UserFactory;
});