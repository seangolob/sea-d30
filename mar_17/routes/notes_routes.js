'use strict';
var Note = require('../models/Note');
var eat_auth = require('../lib/eat_auth');
var bodyparser = require('body-parser');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  app.get('/notes', eat_auth(appSecret), function(req, res) {
    Note.find({user_id: req.user._id}, function(err, data) {
      if (err) return res.status(500).send({'msg': 'could not retrieve notes'});

      res.json(data);
    });
  });

  app.post('/notes', eat_auth(appSecret), function(req, res) {
    var newNote = new Note(req.body); 
    newNote.save(function(err, note) {
      if (err) return res.status(500).send({'msg': 'could not save note'});

      res.json(note);
    });
  });

  app.put('/notes/:id', eat_auth(appSecret), function(req, res) {
    var updatedNote = req.body;
    delete updatedNote._id;
    Note.update({_id: req.params.id}, updatedNote, function(err) {
      if (err) return res.status(500).send({'msg': 'could not update note'});

      res.json(req.body);
    });
  });
};
