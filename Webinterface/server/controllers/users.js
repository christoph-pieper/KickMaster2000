const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  HttpStatus = require('http-status-codes'),
  fs = require('fs'),
  path = require('path');

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
 *   users:
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
 *           $ref: '#/definitions/users'
 */
router.get('/', function(req, res) {
  User.find({}, { password: 0, image: 0 }, (err, user) => {
    if (err || !user) {
      res.sendStatus(HttpStatus.NOT_FOUND);
    } else {
      res.status(HttpStatus.OK).json(user);
    }
  });
});

router.get('/:id/image', function(req, res) {
  if (req.params.id) {
    User.findById(req.params.id, (err, user) => {
      if (err || !user) {
        res.sendStatus(HttpStatus.NOT_FOUND);
      } else if (user.image.contentType && user.image.data) {
        res.contentType(user.image.contentType);
        res.send(user.image.data);
      } else {
        res.sendFile(__basedir + '/static/default-user-image.png');
      }
    });
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

router.post('/:id/image', fileUpload, function(req, res) {
  if (req.params.id) {
    const newUser = {
      image: {
        contentType: null,
        data: null
      }
    };
    newUser.image.contentType = req.files.image[0].mimetype;
    fs.readFile(req.files.image[0].path, (err, data) => {
      newUser.image.data = data;
      User.findByIdAndUpdate(req.params.id, newUser, (err, user) => {
        if (err || !user) {
          res.sendStatus(500);
        } else {
          res.send(user.image.data);
        }
      });
    });
  } else {
    res.sendStatus(HttpStatus.NOT_FOUND);
  }
});

router.delete('/:id/image', fileUpload, function(req, res) {
  if (req.params.id) {
    User.findByIdAndUpdate(req.params.id, { image: null }, (err, user) => {
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
  const user = new User(req.body);
  user.save(function(err, savedUser) {
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
    (exists) => {
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
  if (req.params.id) {
    User.findById(req.params.id, (err, user) => {
      if (err || !user) {
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
  let updatetUser = new User(req.body);
  User.findByIdAndUpdate(req.params.id, updatetUser, { new: true }, function(
    err,
    user
  ) {
    if (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err);
    } else {
      res.status(HttpStatus.OK).json(user);
    }
  });
});

router.delete('/:id', function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      res.status(HttpStatus.BAD_REQUEST).json(err);
    } else {
      res.status(HttpStatus.OK).json(user);
    }
  });
});

module.exports = router;
