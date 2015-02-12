'use strict';

var express = require('express');
var http = require('http');
var app = express();

var awesome = function(req, res, next) {
  req.awesome = 'woahh, new awesome';
  next();
};

var middleWare = function(req, res, next) {
  console.log('hello from middleware');
  req.message = 'hello from middleware\n';
  if (req.awesome) {
    return next(new Error('stuff was way too awesome'));
  }

  next()
};

var router = new express.Router();
router.get('/', function(req, res) {
  res.send('hello from router');
});

router.get('/bar', function(req, res) {
  res.send('from /bar');
});

app.use('/foo', router);

app.use(middleWare);

app.get('/', awesome, function(req, res) {
  res.send(req.awesome + ': ' +  req.message + 'hello world');
});

app.get('/greet/:name/:title', function(req, res) {
  res.send('hello ' + req.params.title + '. ' +  req.params.name);
});

app.get('/*', function(req, res) {
  res.status(404).send('page note found');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});
