'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');

var NoteStore = require('./modules/stores/note-store');

var actions = require('./modules/actions/note-actions');

var stores = {
  NoteStore: new NoteStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var NotesApp = require('./modules/components/note-app');

React.render(<NotesApp flux={flux}/>, document.body);
