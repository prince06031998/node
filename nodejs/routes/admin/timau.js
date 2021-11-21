var express = require('express');
var adSearchAu = express.Router();
var user = require('../../models/user.js')

adSearchAu.route('/')
    .get(function (req, res, next) {
        res.render('timau.ejs')
    })

    .post(function (req, res, next) {
        user.find({ name: { '$regex': req.body.txtTen,$options: "i" } },
        (err, data) => {
          res.render('xemdsnv.ejs', { 
              data
             });
        })
    });

module.exports = adSearchAu;