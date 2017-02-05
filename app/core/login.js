app.controller('loginCtrl',['$scope','Auth',function ($scope,Auth) {
  $scope.login = function () {
    Auth.$signInWithEmailAndPassword($scope.email,$scope.pass).then(function(u){
      console.log(u);
    }).catch(function(){
      $scope.error = "Invalid credentials"
    })
  }
}])
