app.controller('kanbanCtrl',['$scope','$firebaseArray','$firebaseObject','Auth',function ($scope,$firebaseArray,$firebaseObject,Auth) {

  var userRef = firebase.database().ref().child('users').child(Auth.$getAuth().uid)
  var user = $firebaseObject(userRef)

  userRef = userRef.child('todo')
  var todoList = $firebaseArray(userRef)


  var ref = firebase.database().ref().child('planning')
  $scope.tasks_planning = $firebaseArray(ref)

  ref = firebase.database().ref().child('doing')
  $scope.tasks_doing = $firebaseArray(ref)

  ref = firebase.database().ref().child('done')
  $scope.tasks_done = $firebaseArray(ref)

  $scope.changeToDoing = function (task) {
    $scope.tasks_planning.$remove(task)
    task.doing = user.name
    $scope.tasks_doing.$add(task)
  }

  $scope.changeToDone = function (task) {
    $scope.tasks_doing.$remove(task)
    task.done = user.name
    $scope.tasks_done.$add(task)
  }

  $scope.backToPlanning = function (task) {
    $scope.tasks_doing.$remove(task)
    $scope.tasks_planning.$add(task)
  }

  $scope.backToDoing = function (task) {
    $scope.tasks_done.$remove(task)
    task.doing = user.name
    $scope.tasks_doing.$add(task)
  }

  $scope.trashDone = function (task) {
    $scope.tasks_done.$remove(task)
  }

  $scope.trashPlanning = function (task) {
    $scope.tasks_planning.$remove(task)
  }
}])
