var express = require('express');

var submit_themblog = express.Router();

const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const { stripHtml } = require("string-strip-html");
var blog = require('../../models/blog.js')

submit_themblog.route('/')
    
    .post(function (req, res, next) {
        var d = new Date();
        var fullTime = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
        var hinhanh = req.files.image
        
        var duongdan = 'public/images/' + hinhanh.name

        hinhanh.mv(duongdan, err => {
          if (err) return res.status(500).send(err);
          var blog_moi = new blog(
            {
              name: req.body.name,
              des: req.body.des,
              content:htmlPurify.sanitize(req.body.content),
              author: req.session.name,
              date: fullTime,
              loai: req.body.loai,
              snippet:stripHtml(htmlPurify.sanitize(req.body.content).substring(0, 200)).result,
              image: hinhanh.name,
              idAu:req.session.userID,
            });
          return blog_moi.save(err => { res.redirect('/') });
        });
      });

module.exports = submit_themblog;