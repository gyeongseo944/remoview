const mongoose = require('mongoose');
/// ===require to password hash==
const bcrypt = require('bcrypt')
const saltRounds = 10;
/// =============================
const userSchema = mongoose.Schema({
    name :{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minglength:5
    },
    lastname:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    token :{
        type:String,
    },
    tokenExp:{
        type:Number
    }
});

userSchema.pre('save',(next)=>{ // this means 'before saving'
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, (err,salt)=>{
            if(err) return next(err);
            bcrypt.hash(userSchema.password,salt, (err,hash)=>{
                if(err) return next(err);
                user.password = hash
            })
        })
    }else{
        next()
    }
})


const User = mongoose.model('User', userSchema);

module.exports={User}