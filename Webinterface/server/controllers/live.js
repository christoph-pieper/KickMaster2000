const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  HttpStatus = require('http-status-codes');


var timeInterval;
var game;


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

/**
 * @swagger
 * definition:
 *   game:
 *     properties:
 *       player1:
 *         $ref: '#/definitions/user'
 *       player2:
 *         $ref: '#/definitions/user'
 *       scorePlayerOne:
 *         type: integer
 *       scorePlayerTwo:
 *         type: integer
 *       timeInSeconds:
 *         type: integer
 */

  /**
 * @swagger
 *
 * /api/v1/live/game:
 *   get:
 *     tags:
 *       - EndpointsForChristoph
 *     description: Gets current game
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: Accepted
 *         schema:
 *           $ref: '#/definitions/game'
 *       400:
 *         description: Bad Request
 */
router.get('/game', function(req, res) {
  if( game ){
    res.json(game);
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

/**
 * @swagger
 *
 * /api/v1/live/game:
 *   post:
 *     tags:
 *       - EndpointsForChristoph
 *     description: Starts a game
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Data
 *         description: Data
 *         in:  body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/game'
 *     responses:
 *       200:
 *         description: Accepted
 *         schema:
 *       404:
 *         description: No Game running
 */
  router.post('/game', function(req, res) {
    User.findById(req.body.player1, {image: 0, password: 0}, (err, player1) => {
      if(!err && player1) {
        User.findById(req.body.player2, {image: 0, password: 0}, (err, player2) => {
          if(!err && player2) {
            game = {
              'player1': player1,
              'player2': player2,
              timeInSeconds: req.body.timeInSeconds
            }
            setTime();
            io.emit('message', {
              action: 'startgame',
              payload: game
            });
            res.sendStatus(HttpStatus.NO_CONTENT);
          }else{
            res.sendStatus(HttpStatus.BAD_REQUEST);
          }
        })
      }else{
        res.sendStatus(HttpStatus.BAD_REQUEST);
      }
    })
    // res.sendStatus(HttpStatus.NO_CONTENT);
  });

  /**
 * @swagger
 *
 * /api/v1/live/game:
 *   put:
 *     tags:
 *       - EndpointsForChristoph
 *     description: Updates current game
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Accepted
 *       400:
 *         description: Bad request
 */
  router.put('/game', function(req, res) {
    io.emit('message', {
      action: 'updategame',
      payload: game
    });
    res.sendStatus(HttpStatus.NO_CONTENT);
  });

    /**
 * @swagger
 *
 * /api/v1/live/game:
 *   delete:
 *     tags:
 *       - EndpointsForChristoph
 *     description: Stops a game
 *     produces:
 *       - application/json
 *     responses:
 *       204:
 *         description: Accepted
 *       209:
 *         description: Already Reported
 */
router.delete('/game', function(req, res) {
  clearTime();
  io.emit('message', {
    action: 'stopgame',
    payload: {

    }
  });
  res.sendStatus(HttpStatus.NO_CONTENT);
});

  return router;
};



setTime = () => {
  if(game) {
    timeInterval = setInterval( () => {
      game.timeInSeconds = Math.max(game.timeInSeconds - 1, 0);
      if (game.timeInSeconds === 0) {
        clearTime();
      }
    }, 1000)
  }
}

clearTime = () => {
  clearInterval(timeInterval);
}
