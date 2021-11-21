var express = require('express');
var routerRegis = express.Router();
var user = require('../../models/user.js')

routerRegis.route('/')
    .get(function (req, res, next) {
        res.render('dangky.ejs')
    })

    .post(function (req, res, next) {
        if (!req.files || Object.keys(req.files).length === 0) {
            var nguoidung = new user({ name: req.body.name, age: req.body.age })
            return nguoidung.save(error => res.redirect('/dangky'))
        }
        var hinhanh = req.files.hinh
        var duongdan = 'public/images/' + hinhanh.name
        hinhanh.mv(duongdan, err => {
            if (err) return res.status(500).send(err);
        var nguoidung = new user({
            name:req.body.name,
            avatar: hinhanh.name,
            username: req.body.username,
            password: req.body.password,
            

        })
        nguoidung.save(error =>res.redirect('/'))
    })
    });

module.exports = routerRegis;