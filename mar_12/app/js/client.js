'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var notesData = [{noteBody: 'hello world', _id: 1}, {noteBody: 'goodbye world', _id: 2}];

var NoteForm = React.createClass({
  getInitialState: function() {
    return {newNote: {noteBody: ''}};
  },
  handleChange: function(event) {
    this.setState({newNote: {noteBody: event.target.value}});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    console.log(this.state.newNote);
    var newNote = this.state.newNote;
    ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(newNote),
      success: function(data) {
        this.props.onNewNoteSubmit(data);
        this.setState({newNote: {noteBody: ''}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newnote">New Note</label>
        <input id="newnote" type="text" value={this.state.newNote.noteBody} onChange={this.handleChange}/>
        <button type="submit">Create New Note</button>
      </form>
    )
  }
});

var Note = React.createClass({
  render: function() {
    return <li>{this.props.data.noteBody}</li>
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
  getInitialState: function() {
    return {notesData: []};
  },
  onNewNote: function(note) {
    note._id = this.state.notesData.length + 1;
    var stateCopy = this.state;
    stateCopy.notesData.push(note);
    this.setState(stateCopy);
  },
  componentDidMount: function() {
    ajax({
      url: this.props.notesBaseUrl,
      dataType: 'json',
      success: function(data) {
        var state = this.state;
        state.notesData = data;
        this.setState(state);
      }.bind(this),
      error: function(xhr, status) {
        console.log(xhr, status);
      }
    });
  },
  render: function() {
    return (
      <main>
        <NoteForm onNewNoteSubmit={this.onNewNote} url={this.props.notesBaseUrl}/>
        <NoteList data={this.state.notesData} />
      </main>
    )
  }
});

React.render(<NotesApp notesBaseUrl={'/api/v1/notes'}/>, document.body);
