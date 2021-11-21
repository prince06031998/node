var db=require('mongoose');
db.connect('mongodb://localhost/csdlnv')

var adminSchema=db.Schema({
     adminname:String
    ,password:String

},{versionKey:false})


var admin=db.model('admin',adminSchema)

module.exports=admin