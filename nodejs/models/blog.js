var db = require('mongoose');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const stripHtml = require('string-strip-html');
db.connect('mongodb://localhost/csdlnv');



var blogSchema = db.Schema(
    {
        name: String, 
        des:String,
        content:String,
        author:String,
        date:String,
        loai:String,
        snippet:String,
        image:String,
        idAu:String
        
    },{versionKey: false});

    
var blog = db.model('tb_blogs', blogSchema);
module.exports = blog;