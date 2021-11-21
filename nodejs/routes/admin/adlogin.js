var express = require('express');
var adLogin = express.Router();
var admin = require('../../models/admin.js');

adLogin.route('/')
    .get(function (req, res, next) {
        res.render('adlogin.ejs')
    })

    .post(function(req, res,next){
        let a = admin.findOne({ 
            adminname : { $eq : req.body.tdna }, 
            password : { $eq : req.body.mka } 
        },(error,login)=>{
            if(login != null){
                req.session.adminID = login._id;
                req.session.adminname = login.adminname;
                res.redirect('/xem1');
            } else {
                res.redirect('/adlog');
            }
            error => res.redirect('/adlog')
        });
    });
    

module.exports = adLogin;