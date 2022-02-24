const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
});

userSchema.pre('save', function (next) { // this means 'before saving' 
    var user = this;
    if(user.isModified('password')){
        // bcrypt.genSalt(saltRounds, function(err,salt){ // first method to make a hash password
        //     if(err) return next(err);
        //     bcrypt.hash(user.password,salt, function(err,hash){
        //         if(err) return next(err);
        //         user.password = hash
        //     })
        // })
        bcrypt.hash(user.password,saltRounds,function(err,hash){ // second method to make a hash password
            if(err){ 
                return next(err);
            }else{
                user.password = hash;
                next();
            }
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function (plainPwd, cb) {
    let pwd = this.password
    bcrypt.compare(plainPwd, pwd, function (err, isMatch) {
        if(err) return cb(err);
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret');

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user = this;

    jwt.verify(token,'secret',function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null, user)
        });
    });

}

const User = mongoose.model('User', userSchema);

module.exports = { User }