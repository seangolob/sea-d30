'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

notesApp.controller('notesMainController', ['$scope', function($scope) {
  $scope.greeting = 'hello world';
}]);
