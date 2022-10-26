let mongoose=require('mongoose');
 
let Admin = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String
});
 
module.exports = mongoose.model('admin', Admin);