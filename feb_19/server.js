'use strict';
var express = require('express');
var mongoose = require('mongoose');
var notesRoutes = require('./routes/notes_routes');
var passport = require('passport');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/notesapp_development');

var app = express();
app.set('appSecret', process.env.SECRET || 'changethischangethis!');
app.use(passport.initialize());
require('./lib/passport_strat')(passport);

var notesRouter = express.Router();
var userRouter = express.Router();

notesRoutes(notesRouter, app.get('appSecret'));
require('./routes/user_routes')(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', notesRouter);
app.use('/api/v1', userRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
