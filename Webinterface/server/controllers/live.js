const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  HttpStatus = require('http-status-codes');





module.exports = function(io) {
  router.get('/', function(req, res) {
    User.find({}, { password: 0, image: 0 }, (err, user) => {
      if (err || !user) {
        res.sendStatus(HttpStatus.NOT_FOUND);
      } else {
        res.status(HttpStatus.OK).json(user);
      }
    });
  });



  router.post('/startgame', function(req, res) {
    User.findById(req.body.player1, (err, player1) => {
      if(!err && player1) {
        User.findById(req.body.player2, (err, player2) => {
          if(!err && player2) {
            io.emit('message', {
              action: 'startgame',
              payload: {
                'player1': player1,
                'player2': player2
              }
            });
            res.sendStatus(HttpStatus.NO_CONTENT);
          }else{
            res.sendStatus(HttpStatus.NOT_FOUND);
          }
        })
      }else{
        res.sendStatus(HttpStatus.NOT_FOUND);
      }
    })
    // res.sendStatus(HttpStatus.NO_CONTENT);
  });

  router.post('/stopgame', function(req, res) {
    io.emit('message', {
      action: 'stopgame',
      payload: req.body
    });
    res.sendStatus(HttpStatus.NO_CONTENT);
  });

  return router;
};
