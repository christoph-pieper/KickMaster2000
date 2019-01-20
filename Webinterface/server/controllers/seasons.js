const express = require('express'),
  router = express.Router(),
  HttpStatus = require('http-status-codes'),
  connection = require('../database/db');

router.get('/', function (req, res) {
  if (req.query.activeOnly) {
    let sql = 'select * from seasons where current=TRUE';
    connection.query(sql, (err, seasons, fields) => {
      if (err || !seasons || seasons.length == 0) {
        console.log(err);
        res.sendStatus(HttpStatus.NOT_FOUND);
      } else {
        res.json(seasons[0]);
      }
    });
  } else if (req.query.archived) {
    let sql = 'select * from seasons where archived=TRUE';
    connection.query(sql, (err, seasons, fields) => {
      if (err || !seasons || seasons.length == 0) {
        console.log(err);
        res.sendStatus(HttpStatus.NOT_FOUND);
      } else {
        res.json(seasons);
      }
    });
  } else {
    getAllUnarchivedSeasons((err, seasons, fields) => {
      if (err || !seasons) {
        console.log(err);
        res.sendStatus(HttpStatus.NOT_FOUND);
      } else {
        res.json(seasons);
      }
    });
  }
});

router.post('/', function (req, res) {
  let sql = 'insert into seasons (name) values ( ? )';
  connection.query(sql, req.body.name, (err, season, fields) => {
    if (err || !season) {
      console.log(err);
      res.status(HttpStatus.CONFLICT).json(err);
    } else {
      getSeason(season.insertId, (err, season, fields) => {
        if (err || !season) {
          console.log(err);
          res.sendStatus(HttpStatus.NOT_FOUND);
        } else {
          res.json(season[0]);
        }
      });
    }
  });
});


router.put('/:id', function (req, res) {
  delete req.body.created_at;
  delete req.body.archived_at;
  if (req.body.current) {
    deactivateAllSeasons((err) => {
      if (err) {
        console.log(err);
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        let sql2 = 'update seasons SET ? where _id = ?';
        delete req.body._id;

        connection.query(sql2, [req.body, req.params.id], (err, season, fields) => {
          if (err || !season) {
            console.log(err);
            res.sendStatus(HttpStatus.NOT_FOUND);
          } else {
            getAllUnarchivedSeasons((err, seasons, fields) => {
              if (err || !seasons) {
                console.log(err);
                res.sendStatus(HttpStatus.NOT_FOUND);
              } else {
                res.json(seasons);
              }
            });
          }
        });
      }
    })
  } else {
    let sql2 = 'update seasons SET ? where _id = ?';
    delete req.body._id;

    connection.query(sql2, [req.body, req.params.id], (err, season, fields) => {
      if (err || !season) {
        console.log(err);
        res.sendStatus(HttpStatus.NOT_FOUND);
      } else {
        res.json(season);
      }
    });
  }

});

function deactivateAllSeasons(callback) {
  let sql = 'update seasons SET current = FALSE where true';
  connection.query(sql, (err, seasons, fields) => {
    if (err || !seasons) {
      callback(err);
    } else {
      callback();
    }
  });
}

function getAllUnarchivedSeasons(callback) {
  let sql = 'select * from seasons where archived = FALSE order by current desc';
    connection.query(sql, (err, seasons, fields) => {
      callback(err, seasons, fields);
    });
}

function getSeason(id, callback) {
  let sql = 'select * from seasons where _id = ?';
    connection.query(sql, id, (err, seasons, fields) => {
      callback(err, seasons, fields);
    });
}

module.exports = router;
