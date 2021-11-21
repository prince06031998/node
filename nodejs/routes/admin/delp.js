var express = require('express');
var adDelBlog = express.Router();
var blog = require('../../models/blog.js')

adDelBlog.route('/')
    .get(function (req, res, next) {
        blog.findOne({ _id: req.params._id })
    })

adDelBlog.route('/:_id')
    .get(function (req, res, next) {
        blog.deleteOne(
            { _id: req.params._id },
            error => res.redirect('/xem2')
        );
    });

module.exports = adDelBlog;