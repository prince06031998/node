var express = require('express');
var searchBlog = express.Router();
var blog = require('../../models/blog.js')

searchBlog.route('/')
    .get(function (req, res, next) {
        res.render('timkiemblog.ejs')
    })

    .post(function (req, res, next) {
        res.locals.userID=req.session.userID
        blog.find({ name: { '$regex': req.body.txtBlog,$options: "i" } },
        (err, data) => {
          res.render('kqtk.ejs', { 
              data
             });
        })
    });

module.exports = searchBlog;