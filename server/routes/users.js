const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { auth } = require("../middleware/auth");

router.get("/auth", auth, (req, res) => {
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

router.post("/register", (req, res) => {
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

router.post("/login", (req, res) => {
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
      } else {
        //로그인 토큰 생성
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.cookie("x_auth", user.token).status(200).json({
            loginSuccess: true,
            userId: user._id,
          });
        });
      }
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      logoutSuccess: true,
    });
  });
});

module.exports = router;
