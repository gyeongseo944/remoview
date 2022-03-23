const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/keys");

const { User } = require("./models/user");
const { auth } = require("./middleware/auth");

//application/x-www-form-urlencoded >> 이렇게 된 데이터를 분석해서 가져 올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true }));
//application/json >> 이렇게 된 데이터를 분석해서 가져 올 수 있게 해줌
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("===DB error=== ::: " + err);
  });

app.get("/api/hello", (req, res) => {
  res.send("안녕하세요");
});

app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.post("/api/user/register", (req, res) => {
  //회원가입 할 때 필요한 정보를 가지고 있는 user
  const user = new User(req.body);
  //db에 회원 정보 저장
  user.save((err, userData) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({
        success: true,
      });
    }
  });
});

app.post("/api/user/login", (req, res) => {
  //find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      //해당 이메일 user정보가 없다면
      return res.json({
        loginSuccess: false,
        message: "email not found",
      });
    }
    //compare password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        //isMatch가 false면
        return res.json({
          loginSuccess: false,
          message: "wrong password",
        });
      }
    });
    //로그인 토큰 생성
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json({
        loginSuccess: true,
        userId: user._id,
      });
    });
  });
});

app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      logoutSuccess: true,
    });
  });
});

app.listen(5000);
