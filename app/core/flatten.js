var app = angular.module('flatten',['ngAnimate','ngRoute','firebase','ngDragDrop'])

app.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/login");
    }
  });
}]);

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.config(function($routeProvider){
  $routeProvider
  .when('/login',{
    templateUrl: '../login.html',
  })
  .when('/',{
    templateUrl: '../kanban.html',
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    }
  })
  .when('/new',{
    templateUrl: '../create.html',
    resolve: {
      "currentAuth": ["Auth", function(Auth) {
        return Auth.$requireSignIn();
      }]
    }
  })
});
