'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var request = require('superagent');

var constants = {
  ADD_NOTE: 'ADD_NOTE',
  TOGGLE_EDIT_NOTE: 'TOGGLE_EDIT_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  REMOVE_NOTE: 'REMOVE_NOTE' 
};

var baseUrl = '/api/v1/notes';

var NoteStore = Fluxxor.createStore({
  initialize: function() {
    this.notes = [];

    this.bindActions(
      constants.ADD_NOTE, this.onNewNote,
      constants.REMOVE_NOTE, this.onRemoveNote
    );

    request
      .get(baseUrl)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.notes = res.body;
        this.emit('change');
      }.bind(this));
  },

  onNewNote: function(note) {
    request
      .post(baseUrl)
      .send(note)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.notes.push(res.body);
        this.emit('change');
      }.bind(this));
  },

  onRemoveNote: function(note) {
    request
      .del(baseUrl + '/' + note._id)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.notes.splice(this.notes.indexOf(note), 1);
        this.emit('change');
      }.bind(this));
  },

  getState: function() {
    return {notes: this.notes};
  }
});

var actions = {
  addNote: function(note) {
    this.dispatch(constants.ADD_NOTE, note);
  },

  deleteNote: function(note) {
    this.dispatch(constants.REMOVE_NOTE, note);
  }
};

var stores = {
  NoteStore: new NoteStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NoteForm = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {newNote: {noteBody: ''}};
  },
  handleChange: function(event) {
    event.preventDefault();

    var stateCopy = this.state;
    if (event.target.name === 'new-note-body')
      stateCopy.newNote.noteBody = event.target.value;
    if (event.target.name === 'new-note-author')
      stateCopy.newNote.author = event.target.value;

    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();

    this.getFlux().actions.addNote(this.state.newNote);
    this.setState({newNote: {noteBody: ''}});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="new-note-body">New Note</label>
        <input id="new-note-body" type="text" value={this.state.newNote.noteBody} onChange={this.handleChange} name="new-note-body"/>
        <label htmlFor="new-note-author">Your Name:</label>
        <input id="new-note-author" type="text" value={this.state.newNote.author} onChange={this.handleChange} name="new-note-author" />
        <button type="submit">Create New Note</button>
      </form>
    )
  }
});

var Note = React.createClass({
  mixins: [FluxMixin],
  handleDelete: function() {
    this.getFlux().actions.deleteNote(this.props.data);
  },
  render: function() {
    return <li><span>{this.props.data.author + ': '}</span>{this.props.data.noteBody}<button onClick={this.handleDelete}>Delete</button></li>
  }
});

var NoteList = React.createClass({
  render: function() {
    var notes = this.props.data.map(function(note) {
      return <Note data={note} key={note._id}/>;
    });
    return (
      <section>
        <h1>Notes:</h1>
        <ul>
          {notes}
        </ul>
      </section>
    )
  }
});

var NotesApp = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('NoteStore')],

  getStateFromFlux: function() {
    return this.getFlux().store('NoteStore').getState();
  },
  render: function() {
    return (
      <main>
        <NoteForm />
        <NoteList data={this.state.notes} />
      </main>
    )
  }
});

React.render(<NotesApp flux={flux}/>, document.body);
