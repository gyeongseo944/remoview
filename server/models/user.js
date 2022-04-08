const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//비밀번호 암호화
userSchema.pre("save", function (next) {
  // 저장 하기 전에 이루어지는 함수
  var user = this;
  if (user.isModified("password")) {
    // bcrypt.genSalt(saltRounds, function(err,salt){ // 암호화 첫번째 방법
    //     if(err) return next(err);
    //     bcrypt.hash(user.password,salt, function(err,hash){
    //         if(err) return next(err);
    //         user.password = hash
    //     })
    // })
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
      // 암호화 두번째 방법
      if (err) {
        return next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  } else {
    //비밀번호를 바꾸는것이 아니라 다른것을 바꿀 경우에는 암호화를 진행하지 않도록
    next();
  }
});

userSchema.methods.comparePassword = function (plainPwd, cb) {
  //비밀번호 매칭 함수
  bcrypt.compare(plainPwd, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  //jsonwebtoken 을 이용해서 token 생성
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secret");
  var oneHour = moment().add(1, "hour").valueOf();

  user.tokenExp = oneHour;
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  // 토큰을 가져오는 메서드
  var user = this;
  //token decode
  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
