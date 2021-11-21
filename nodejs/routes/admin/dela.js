var express = require('express');
var adDelAuthor = express.Router();
var user = require('../../models/user.js')

adDelAuthor.route('/')
    .get(function (req, res, next) {
        user.findOne({ _id: req.params._id })
    })

adDelAuthor.route('/:_id')
    .get(function (req, res, next) {
        user.deleteOne(
            { _id: req.params._id },
            error => res.redirect('/xem1')
        );
    });

module.exports = adDelAuthor;