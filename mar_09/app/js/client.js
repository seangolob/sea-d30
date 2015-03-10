'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

//services
require('./services/resource_service')(notesApp);

//controllers
require('./notes/controllers/notes_controller')(notesApp);

//directives
require('./directives/dummy_directive')(notesApp);
require('./directives/create_resource_directive')(notesApp);
require('./notes/directives/create_note_directive_one')(notesApp);
