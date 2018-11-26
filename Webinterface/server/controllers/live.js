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


/**
 * @swagger
 *
 * /api/v1/live/startgame:
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
 *           type: object
 *           required:
 *             - player1
 *             - player2
 *             - timeInSeconds
 *           properties:
 *             player1:
 *               type: string
 *             player2:
 *               type: string
 *             timeInSeconds:
 *               type: integer
 *     responses:
 *       204:
 *         description: Accepted
 *       400:
 *         description: Bad Request
 */
  router.post('/startgame', function(req, res) {
    User.findById(req.body.player1, (err, player1) => {
      if(!err && player1) {
        User.findById(req.body.player2, (err, player2) => {
          if(!err && player2) {
            io.emit('message', {
              action: 'startgame',
              payload: {
                'player1': player1,
                'player2': player2,
                timeInSeconds: req.body.timeInSeconds
              }
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
 * /api/v1/live/stopgame:
 *   post:
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
  router.post('/stopgame', function(req, res) {
    io.emit('message', {
      action: 'stopgame',
      payload: req.body
    });
    res.sendStatus(HttpStatus.NO_CONTENT);
  });

  return router;
};
