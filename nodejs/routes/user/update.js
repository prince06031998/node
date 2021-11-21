var express = require('express');
var updateNhanVien = express.Router();
var user = require('../../models/user.js')

updateNhanVien.route('/')
    .get(function (req, res, next) {
        var nv = {}
        res.render('suatg.ejs', { nv });
    })
    .post(function (req, res, next) {
        user.findOne({
            _id: req.body._id
        }, (error, nv) => {
            if (!req.files || Object.keys(req.files).length === 0) {
                nv.name = req.body.name
                
                return nv.save(error => res.redirect('/profile'))
            }
            var hinhanh = req.files.hinhanh
            var duongdan = 'public/images/' + hinhanh.name
            hinhanh.mv(duongdan, err => {
                if (err) return res.status(500).send(err);


                nv.name = req.body.name,
                    
                    nv.avatar = hinhanh.name
                    nv.save(error => res.redirect('/profile'))
            })

        })
    });

updateNhanVien.route('/:_id')
    .get(function(req, res, next){
        user.findOne({username:req.session.username},
            (error,nv)=>{
                console.log(nv);
                res.render('suatg.ejs',{nv});
            })
    });

module.exports = updateNhanVien;