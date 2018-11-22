var express = require('express')
    , router = express.Router()
    , User = require('../models/user')
    , sendMail = require('./../email/emailHandler');

var HttpStatus = require('http-status-codes');

// Define routes handling profile requests

router.get('/', function (req, res) {
    if ( req.session && req.session.user ) {
        res.json(req.session.user);
    } else {
        res.sendStatus(HttpStatus.UNAUTHORIZED)
    }
});

router.post('/', function (req, res) {
    req.checkBody("username", "Der Username darf nicht leer sein!").notEmpty();
    req.checkBody("password", "Das Passwort darf nicht leer sein!").notEmpty();
    req.getValidationResult().then(function (result) {
        if (result.isEmpty()) {
            User.findOne({ username: req.body.username }, (err, user) => {
                if (err || !user) {
                    res.sendStatus(HttpStatus.UNAUTHORIZED);
                } else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (err) {
                            res.sendStatus(HttpStatus.UNAUTHORIZED);
                        }
                        if (isMatch) {
                            req.session.user = user;
                            req.session.userId = user._id.toString();
                            res.status(HttpStatus.OK).json({
                                'user': user,
                                'key': req.sessionID
                            });
                        }else{
                            res.sendStatus(HttpStatus.UNAUTHORIZED);
                        }
                    });
                }
            });
        } else {
            res.status(HttpStatus.BAD_REQUEST).json(result.array());
        }
    });
});

router.delete('/', function (req, res) {
    req.session.destroy();
    res.sendStatus(HttpStatus.NO_CONTENT);
});


module.exports = router