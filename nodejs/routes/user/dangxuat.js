var express = require('express');
var routerLogout = express.Router();


routerLogout.route('/')
    .get(function (req, res, next) {
        req.session.userID= undefined
        res.redirect('/')
    })

module.exports = routerLogout;