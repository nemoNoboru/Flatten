app.controller('createCtrl',['$scope','$firebaseArray','$firebaseObject','$location','Auth',function ($scope,$firebaseArray,$firebaseObject,$location,Auth) {
  var userRef = firebase.database().ref().child('users').child(Auth.$getAuth().uid)
  var user = $firebaseObject(userRef)

  $scope.task = {}
  $scope.task.tags = []

  $scope.push = function () {
    var ref = firebase.database().ref().child('planning')
    var planning = $firebaseArray(ref)
    $scope.task.planned = user.name
    planning.$add($scope.task)
    $location.path('/')
  }

}])
