const express = require('express'),
  router = express.Router(),
  HttpStatus = require('http-status-codes'),
  connection = require('../database/db'),
  doubleroundrobin = require('../utils/doubleroundrobin'),
  knockout = require('../utils/knockout');

router.get('/table', function(req, res) {
  let sql = 'select _id, name, created_at from users';
  connection.query(sql, req.params.id, (err, users, fields) => {
    if (err || !users) {
      console.log(err);
      res.sendStatus(HttpStatus.NOT_FOUND);
    } else {
      res.status(HttpStatus.OK).json(doubleroundrobin(users));
    }
  });
});

router.get('/cup', function(req, res) {
  let sql = 'select _id, name, created_at from users';
  connection.query(sql, req.params.id, (err, users, fields) => {
    if (err || !users) {
      console.log(err);
      res.sendStatus(HttpStatus.NOT_FOUND);
    } else {
      res.status(HttpStatus.OK).json(knockout(users));
    }
  });
});


module.exports = router;
