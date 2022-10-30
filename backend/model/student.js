let mongoose=require('mongoose');
let bcrypt = require('bcrypt');


let Student = new mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true, index: { unique: true } },
    password:{ type: String, min: 6, required: true },
    role:{ type: String, default: "Student" },
});

Student.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


Student.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

 
module.exports = mongoose.model('student', Student);