var express = require('express');
var adSearchPost = express.Router();
var blog = require('../../models/blog.js')

adSearchPost.route('/')
    .get(function (req, res, next) {
        res.render('timkiem.ejs')
    })

    .post(function (req, res, next) {
        
        blog.find({ name: { '$regex': req.body.txtTen,$options: "i" } },
        (err, myblog) => {
          res.render('kqtkpost.ejs', { 
              myblog
             });
        })
    });

module.exports = adSearchPost;