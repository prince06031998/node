
var express = require('express');
const app = express();
const { route } = require('express/lib/router');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs')
var path = require('path')
var crypto = require('crypto');

var storage = multer.diskStorage({
  //folder upload -> public/upload
  destination: 'public/upload/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, Math.floor(Math.random() * 9000000000) + 1000000000 + path.extname(file.originalname))
    })
  }
})
var upload = multer({ storage: storage });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

var user = require('../models/user.js');
var blog = require('../models/blog.js');
var comment = require('../models/comment.js');

// router.get('*', function (req, res, next) {
//   res.locals.userID = req.session.userID;
//   console.log(res.locals)
//   next()
// });

router.get('*', function (req, res, next) {

  res.locals.user = req.session.userID;
  res.locals.name = req.session.name;
  res.locals.avatar = req.session.avatar;
  res.locals.admin = req.session.adminID;

  // console.log(res.locals.user)

  next();

});

/* GET home page. */
//localhost:3000 ==> mo file index.ejs
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/themblog', function (req, res, next) {
  if (req.session.userID) {

    res.render('thembaiviet.ejs', { title: 'Express' });
  } else {
    res.redirect('/dangnhap');
  }
});

router.get('/adthemblog', function (req, res, next) {
  

    res.render('adthembaiviet.ejs', { title: 'Express' });
  
});

router.get('/dangxuat', function (req, res, next) {
  req.session.userID = undefined
  req.session.adminID = undefined
  res.redirect('/')
})

router.get('/Xembv', function (req, res, next) {
 
    res.redirect('/Xembv/1');
  
});

router.get('/Xembv/:page', function (req, res, next) {
  var perPage = 3;
  var page = req.params.page || 1;
  if (req.query['loai'] === undefined || req.query['loai'] == 'all') {
    blog.find().sort({ _id: -1 })
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, data) => {
        blog.countDocuments((err, count) => {
          if (err) return next(err);
          res.render('xembaiviet.ejs', {
            data,
            current: page,
            pages: Math.ceil(count / perPage)
          })
        })
      })
  } else {
    blog.find({ loai: req.query['loai'] }).sort({ _id: -1 })
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec((err, data) => {
        res.render('xembaiviet.ejs', {
          data,
          current: page,
          pages: Math.ceil(data.length / perPage)
        })
      })
  }
})



router.get('/des_detail/:msblog', function (req, res, next) {
  blog.findOne({ _id: req.params.msblog }, (err, data) => {
    comment.find({ idPost: req.params.msblog }, (err, blog) => {
      // comment.count({ _id: req.params.msblog }, (err, blog) => {
        res.render('chitiet.ejs', { data, blog });
      });
    });
  // });
});
// router.get('/xem', function (req, res, next) {
//   nhanvien.find({}, (error, dulieu) => {
//     console.log(dulieu)
//     res.json({ nhanvien: dulieu})
//   })
// });

router.get('/xem1', function (req, res, next) {
  user.find({}, (error, data) => {
    // console.log(dulieu)
    res.render('xem.ejs', { data });
  })

});

router.get('/xem2', function (req, res, next) {

  blog.find({},
    (err, myblog) => {
      res.render('adminxem.ejs', { myblog })

    });
});

router.get('/profile', function (req, res, next) {
  user.find({ _id: req.session.userID },
    (err, data) => {
      blog.find({ idAu: req.session.userID },
        (err, myblog) => {
          res.render('profile.ejs', { myblog, data })
        });
    });
});

router.post('/comment/:_id', function (req, res, next) {
  var id = req.params._id;
  var d = new Date();
  var fullTime = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
  var cmt = new comment(
    {
      content: req.body.comment,
      idPost: id,
      date: fullTime,
      person: req.session.name



    });
  return cmt.save(err => { res.redirect('/') });
});

// router.get('/delete/:_id', function (req, res, next) {
//   nhanvien.deleteOne(
//     { _id: req.params._id },
//     error => res.redirect('/xem1')
//   );
// });

/*router.get('/tim', function (req, res, next) {
  res.render('timkiem.ejs')
})
router.post('/tim', function (req, res, next) {
  nhanvien.find({ name: { '$regex': req.body.txtTennv,$options: "i" } },
    (err, dulieu) => {
      res.render('xemdsnv.ejs', { dulieu });
    })
});*/
// router.get('/xem1', function (req, res, next) {
//   // res.render('xemdsnv.ejs', { title: 'Express' });
//   res.redirect('/1');
// });
// router.get('/xem1/:page', function (req, res, next) {
//   var perPage = 1;
//   var page = req.params.page || 1
//   nhanvien.find()
//     .skip((perPage * page) - perPage)
//     .limit(perPage)
//     .exec((err, dulieu) => {
//       nhanvien.countDocuments((err, count) => {
//         if (err) return next(err)
//         res.render('xemdsnv.ejs', { dulieu, current: page, pages: Math.ceil(count / perPage) })
//       })
//     })
// })




// router.post('/submit_themblog', function (req, res, next) {
//   var d = new Date();
//   var fullTime = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
//   var hinhanh = req.files.image
//   var duongdan = 'public/images/' + hinhanh.name
//   hinhanh.mv(duongdan, err => {
//     if (err) return res.status(500).send(err);
//     var blog_moi = new blog(
//       {
//         name: req.body.name,
//         des: req.body.des,
//         content:req.body.content,
//         author: req.session.name,
//         date: fullTime,
//         loai: req.body.loai,
//         image: hinhanh.name
//       });
//     return blog_moi.save(err => { res.redirect('/') });
//   });
// });



//show all image in folder upload to json
router.get('/files', function (req, res) {
  const images = fs.readdirSync('public/upload')
  var sorted = []
  for (let item of images) {
    if (item.split('.').pop() === 'png'
      || item.split('.').pop() === 'jpg'
      || item.split('.').pop() === 'jpeg'
      || item.split('.').pop() === 'svg') {
      var abc = {
        "image": "/upload/" + item,
        "folder": '/'
      }
      sorted.push(abc)
    }
  }
  res.send(sorted);
})
//upload image to folder upload
router.post('/upload', upload.array('flFileUpload', 12), function (req, res, next) {
  res.redirect('back')
});
//delete file
router.post('/delete_file', function (req, res, next) {
  var url_del = 'public' + req.body.url_del
  console.log(url_del)
  if (fs.existsSync(url_del)) {
    fs.unlinkSync(url_del)
  }
  res.redirect('back')
});

module.exports = router;                                                                  
