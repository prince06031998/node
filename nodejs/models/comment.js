var db = require('mongoose');

db.connect('mongodb://localhost/csdlnv');



var commentSchema = db.Schema(
    {
        content:String,
        idPost:String,
        date:String,
        person:String
        
    },{versionKey: false});

    
var comment = db.model('tb_comments', commentSchema);
module.exports = comment;