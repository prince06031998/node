var express = require('express');
var updateBlog = express.Router();
var blog = require('../../models/blog.js')
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const { stripHtml } = require("string-strip-html");
var blog = require('../../models/blog.js')

updateBlog.route('/')
    .get(function (req, res, next) {
        var bl = {}
        res.render('suablog.ejs', { bl });
    })
    .post(function (req, res, next) {
        blog.findOne({
            _id: req.body._id
        }, (error, bl) => {
            if (!req.files || Object.keys(req.files).length === 0) {
                
               bl.name = req.body.namebl
               
                
                return bl.save(error => res.redirect('/'))
            }
            var hinhanh = req.files.img
            var duongdan = 'public/images/' + hinhanh.name
            hinhanh.mv(duongdan, err => {
                if (err) return res.status(500).send(err);


                bl.name = req.body.namebl, 
                bl.content=htmlPurify.sanitize(req.body.content),             
                bl.des=req.body.des,
                bl.loai=req.body.loai,
                bl.snippet=stripHtml(htmlPurify.sanitize(req.body.content).substring(0, 200)).result,
                bl.image = hinhanh.name

                    bl.save(error => res.redirect('/'))
            })

        })
    });

updateBlog.route('/:_id')
    .get(function(req, res, next){
        blog.findOne({_id : req.params._id},
            (error,bl)=>{
                
                res.render('suablog.ejs',{bl});
            })
    });

module.exports = updateBlog;