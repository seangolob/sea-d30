'use strict';

var React = require('react');

var notesData = [{noteBody: 'hello world', _id: 1}, {noteBody: 'goodbye world', _id: 2}];

var Note = React.createClass({
  render: function() {
    return <li>{this.props.data.noteBody}</li>
  }
});

var NoteList = React.createClass({
  render: function() {
    var notes = [];
    for(var i = 0; i < this.props.data.length; i++){
      notes.push(<Note data={this.props.data[i]} key={this.props.data[i]._id}/>);
    }
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

var App = React.createClass({
  getInitialState: function() {
    return {notesData: notesData};
  },
  render: function() {
    return (
      <main>
        <NoteList data={this.state.notesData} />
      </main>
    )
  }
});

React.render(<App />, document.body);
