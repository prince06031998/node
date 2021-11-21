var db=require('mongoose');
var bcrypt=require('bcrypt');
db.connect('mongodb://localhost/csdlnv')

var userSchema=db.Schema({
     name:String,
     avatar:String,
     username:String
    ,password:String
},{versionKey:false})

userSchema.pre('save',function(next){
    var user=this
    bcrypt.hash(user.password,10,function(err,matkhaumahoa){
        user.password=matkhaumahoa
        next()
    })
})
var user=db.model('user',userSchema)

module.exports=user