let mongoose=require('mongoose');
 
let Teacher = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
});
 
module.exports = mongoose.model('teacher', Teacher);