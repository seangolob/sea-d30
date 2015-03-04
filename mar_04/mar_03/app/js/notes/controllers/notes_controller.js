'use strict';

module.exports = function(app) {
  app.controller('notesController', ['$scope', '$http', function($scope, $http) {
    $scope.notes = [];
    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: '/api/v1/notes'
      })
      .success(function(data) {
        $scope.notes = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.create = function(note) {
      $http({
        method: 'POST',
        url: '/api/v1/notes',
        data: note
      }) 
      .success(function(data) {
        $scope.notes.push(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.save = function(note) {
      $http({
        method: 'PUT',
        url: '/api/v1/notes/' + note._id,
        data: note
      })
      .success(function() {
        note.editing = false;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.remove = function(note) {
      $http({
        method: 'DELETE',
        url: '/api/v1/notes/' + note._id
      })
      .success(function() {
        $scope.notes.splice($scope.notes.indexOf(note), 1);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.editToggle = function(note) {
      if (note.editing) {
        note.noteBody = note.oldNoteBody;
        note.editing = false;
      } else {
        note.oldNoteBody = note.noteBody;
        note.editing = true;
      }
    };
  }]);
};
