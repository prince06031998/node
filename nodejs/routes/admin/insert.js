// var express = require('express');
// var routerInsert = express.Router();
// var nhanvien = require('../../models/nhanvien.js')

// routerInsert.route('/')
//     .get(function (req, res, next) {
//         res.render('themnv.ejs', { title: 'Express' });
//     })

//     .post(function (req, res, next) {
//         if (!req.files || Object.keys(req.files).length === 0) {
//             var nvmoi = new nhanvien({ name: req.body.name, age: req.body.age })
//             return nvmoi.save(error => res.redirect('/xem1'))
//         }
//         var hinhanh = req.files.hinh
//         var duongdan = 'public/images/' + hinhanh.name
//         hinhanh.mv(duongdan, err => {
//             if (err) return res.status(500).send(err);

//             var nvmoi = new nhanvien({
//                 name: req.body.name,
//                 age: req.body.age,
//                 avatar: hinhanh.name
//             })
//             nvmoi.save(error => res.redirect('/xem1'))
//         })
//     });

// module.exports = routerInsert;