let mongoose=require('mongoose');
 
let Student = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
});
 
module.exports = mongoose.model('student', Student);