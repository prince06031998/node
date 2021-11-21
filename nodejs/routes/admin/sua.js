// var express = require('express');
// var routerUpdate = express.Router();
// var nhanvien = require('../../models/nhanvien.js')

// routerUpdate.route('/:_id')
//     .get(function (req, res, next) {
//         nhanvien.findOne(
//             {
//                 _id: req.params._id
//             },
//             (error, nv) => { res.render('sua.ejs', { nv }); }
//         )

//     });

// routerUpdate.route('/')
//     .get(function (req, res, next) {
//         var nv = {}
//         res.render('sua.ejs', { nv });
//     })
//     .post(function (req, res, next) {
//         nhanvien.findOne({
//             _id: req.body._id
//         }, (error, nv) => {
//             if (!req.files || Object.keys(req.files).length === 0) {
//                 nv.name = req.body.name
//                 nv.age = req.body.age
//                 return nv.save(error => res.redirect('/xem1'))
//             }
//             var hinhanh = req.files.hinh
//             var duongdan = 'public/images/' + hinhanh.name
//             hinhanh.mv(duongdan, err => {
//                 if (err) return res.status(500).send(err);


//                 nv.name = req.body.name,
//                     nv.age = req.body.age,
//                     nv.avatar = hinhanh.name,
//                     nv.save(error => res.redirect('/xem1'))
//             })

//         })
//     });

// module.exports = routerUpdate;                                                                
