var express = require('express');
var routerLogin = express.Router();
var user = require('../../models/user.js');
var bcrypt=require('bcrypt');

routerLogin.route('/')
    .get(function (req, res, next) {
        res.render('dangnhap.ejs')
    })

    .post(function (req, res, next) {
        user.findOne({
            username:req.body.tdn
        },(err,nguoidung)=>{
            if(nguoidung){
                bcrypt.compare(req.body.mk,nguoidung.password,(err,same)=>{
                    if(same){
                        req.session.user = nguoidung.username
                        req.session.userID=nguoidung._id
                        req.session.name=nguoidung.name
                        req.session.username=nguoidung.username
                        req.session.avatar=nguoidung.avatar
                        res.redirect('/')
                    }
                    else
                        res.redirect('/dangnhap')
                })
            }
            else
                res.redirect('/dangnhap')
        })
    });

module.exports = routerLogin;