angular.module('taskApp', [])
  .controller('TaskController', ['$scope', '$http', function ($scope, $http) {
    var API = 'http://localhost:3000/api/tasks';

    $scope.tasks = [];
    $scope.form = { title: '', description: '', status: false };
    $scope.editMode = false;
    $scope.editId = null;
    $scope.errorMsg = '';

    // Load all tasks
    function loadTasks() {
      $http.get(API)
        .then(function (res) { $scope.tasks = res.data; })
        .catch(function () { $scope.errorMsg = 'Failed to load tasks.'; });
    }

    // Create task
    $scope.createTask = function () {
      $scope.errorMsg = '';
      if (!$scope.form.title) { $scope.errorMsg = 'Title is required.'; return; }
      $http.post(API, $scope.form)
        .then(function () { resetForm(); loadTasks(); })
        .catch(function () { $scope.errorMsg = 'Failed to create task.'; });
    };

    // Edit task (populate form)
    $scope.editTask = function (task) {
      $scope.editMode = true;
      $scope.editId = task._id;
      $scope.form = { title: task.title, description: task.description, status: task.status };
      $scope.errorMsg = '';
    };

    // Update task
    $scope.updateTask = function () {
      $scope.errorMsg = '';
      if (!$scope.form.title) { $scope.errorMsg = 'Title is required.'; return; }
      $http.put(API + '/' + $scope.editId, $scope.form)
        .then(function () { resetForm(); loadTasks(); })
        .catch(function () { $scope.errorMsg = 'Failed to update task.'; });
    };

    // Delete task
    $scope.deleteTask = function (id) {
      $scope.errorMsg = '';
      $http.delete(API + '/' + id)
        .then(function () { loadTasks(); })
        .catch(function () { $scope.errorMsg = 'Failed to delete task.'; });
    };

    // Cancel edit
    $scope.cancelEdit = function () { resetForm(); };

    function resetForm() {
      $scope.editMode = false;
      $scope.editId = null;
      $scope.form = { title: '', description: '', status: false };
    }

    loadTasks();
  }]);
