'use strict';

require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');

var notesApp = angular.module('notesApp', ['ngRoute', 'base64', 'ngCookies']);

require('./users/users')(notesApp);

//services
require('./services/resource_service')(notesApp);

//controllers
require('./notes/controllers/notes_controller')(notesApp);

//directives
require('./directives/dummy_directive')(notesApp);
require('./directives/create_resource_directive')(notesApp);
require('./notes/directives/create_note_directive_one')(notesApp);

notesApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/notes', {
    templateUrl: 'templates/notes/notes_template.html',
    controller: 'notesController'
  })
  .when('/about', {
    templateUrl: 'templates/about.html'
  })
  .when('/signup', {
    templateUrl: 'templates/users/signup.html',
    controller: 'signupController'
  })
  .when('/', {
    redirectTo: '/notes'
  })
  .otherwise({
    templateUrl: 'templates/four_oh_four.html'
  })
}]);
