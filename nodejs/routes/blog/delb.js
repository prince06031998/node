var express = require('express');
var delBlog = express.Router();
var blog = require('../../models/blog.js')

delBlog.route('/')
    .get(function (req, res, next) {
        blog.findOne({ _id: req.params._id })
    })

delBlog.route('/:_id')
    .get(function (req, res, next) {
        blog.deleteOne(
            { _id: req.params._id },
            error => res.redirect('/profile')
        );
    });

module.exports = delBlog;