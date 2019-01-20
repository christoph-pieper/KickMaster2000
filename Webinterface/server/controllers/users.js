const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  HttpStatus = require('http-status-codes'),
  fs = require('fs'),
  path = require('path'),
  connection = require('./../database/db');

const multer = require('multer');

const fileUpload = multer({
  dest: __basedir + '/uploads/',
  rename: function(fieldname, filename) {
    return filename;
  }
}).fields([{ name: 'image', maxCount: 1 }]);

/**
 * @swagger
 * definition:
 *   user:
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         type: array
 *         items:
 *           $ref: '#/definitions/user'
 */
router.get('/', function(req, res) {
  let sql = 'select _id, name, created_at from users';
  connection.query(sql, (err, users, fields) => {
    if (err || !users) {
      res.sendStatus(HttpStatus.NOT_FOUND);
    } else {
      res.status(HttpStatus.OK).json(users);
    }
  });
});

router.get('/:id', function(req, res) {
  let sql = 'select _id, name, created_at from users where _id = ?';
  connection.query(sql, req.params.id, (err, users, fields) => {
    if (err || !users) {
      res.sendStatus(HttpStatus.NOT_FOUND);
    } else {
      res.status(HttpStatus.OK).json(users);
    }
  });
});

router.get('/:id/image', function(req, res) {
  let sql = 'select imageContentType, imageData from users where _id = ?';
  if (req.params.id) {
    connection.query(sql, req.params.id, (err, user, fields) => {
      if (err || !user) {
        res.sendStatus(HttpStatus.NOT_FOUND);
      } else if (user[0].imageContentType && user[0].imageData) {
        res.contentType(user[0].imageContentType);
        res.send(user[0].imageData);
      } else {
        res.sendFile(__basedir + '/static/default-user-image.png');
      }
    });
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

router.post('/:id/image', fileUpload, function(req, res) {
  let sql = 'update users SET ? where _id = ?';
  if (req.params.id) {
    fs.readFile(req.files.image[0].path, (err, data) => {
      if(err) {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const image = {
        imageContentType: req.files.image[0].mimetype,
        imageData: data
      }
      connection.query(sql, [image, req.params.id], (err, user, fields) => {
        if (err || !user) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

router.delete('/:id/image', fileUpload, function(req, res) {
  let sql = 'update users SET imageContentType=NULL, imageData=NULL where _id = ?';
  if (req.params.id) {
    connection.query(sql, req.params.id, (err, user, fields) => {
      if (err || !user) {
        res.sendStatus(500);
      } else {
        res.sendStatus(HttpStatus.NO_CONTENT);
      }
    });
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

router.post('/', function(req, res) {
  let sql = 'insert into users SET ?'
  const user = {
    name: req.body.name,
    password: req.body.password
  }
  connection.query(sql, user, (err, savedUser, fields) => {
    if (err) {
      console.log(err);
      res.status(HttpStatus.BAD_REQUEST).json(err);
    } else {
      res.status(HttpStatus.OK).json(savedUser);
    }
  });
});

router.get('/:id/audio', function(req, res) {
  fs.exists(__basedir + '/data/audio/' + req.params.id + '.mp3',
    (exists) => {console.log(exists);
      if (exists) {
        res.sendFile(
          path.join(__basedir, '/data/audio/' + req.params.id + '.mp3')
        );
      } else {
        res.sendFile(path.join(__basedir, '/data/audio/default.mp3'));
      }
    })
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __basedir + '/data/audio');
  },
  filename: function(req, file, cb) {
    cb(null, req.params.id + path.extname(file.originalname));
  }
});

const fileUploadAudio = multer({ storage: storage }).fields([
  { name: 'audio', maxCount: 1 }
]);

router.post('/:id/audio', fileUploadAudio, function(req, res) {
  let sql = 'select _id from users where _id = ?';
  if (req.params.id) {
    connection.query(sql, req.params.id, (err, user) => {
      if (err || !user || user.length != 1) {
        res.sendStatus(HttpStatus.NOT_FOUND);
      } else {
        fileUploadAudio(req, res, (err) => {
          if (!err) {
            res.sendStatus(HttpStatus.OK);
          } else {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
          }
        });
      }
    });
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

router.delete('/:id/audio', fileUpload, function(req, res) {
  if (req.params.id) {

  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

router.put('/:id', function(req, res) {
  let sql = 'update users SET ? where _id = ?'
  delete req.body.created_at;
  connection.query(sql, [req.body, req.params.id], (err, user, fields) => {
    if (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err);
    } else {
      res.status(HttpStatus.OK).json(user);
    }
  });
});

router.delete('/:id', function(req, res) {
  let sql = "delete from users where _id = ? ";
  connection.query(sql, req.params.id, (err, user, fields) => {
    if (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err);
    } else {
      res.status(HttpStatus.OK).json(user);
    }
  });
});

module.exports = router;
