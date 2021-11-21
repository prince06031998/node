var express = require('express');

var adPost = express.Router();

const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const { stripHtml } = require("string-strip-html");
var blog = require('../../models/blog.js')

adPost.route('/')
    
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
              author: 'ADMIN',
              date: fullTime,
              loai: req.body.loai,
              snippet:stripHtml(htmlPurify.sanitize(req.body.content).substring(0, 200)).result,
              image: hinhanh.name,
              idAu:req.session.adminID,
            });
          return blog_moi.save(err => { res.redirect('/xem2') });
        });
      });

module.exports = adPost;