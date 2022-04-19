const express = require("express");
const router = express.Router();
const { Like } = require("../models/like");
const { Dislike } = require("../models/dislike");

router.post("/num", (req, res) => {
  let like = 0;
  let dislike = 0;
  //mongoDB에서 like,dislike 수 가져와서 전달
  Like.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    like = info.length;
  });
  Dislike.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    dislike = info.length;
  });

  res.status(200).json({ success: true, likeNum: like, dislikeNum: dislike });
});

router.post("/liked", (req, res) => {
  let like = false;
  let dislike = false;
  // 사용자가 이 영화를 좋아하거나 싫어하는지
  Like.find({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    if (info.length !== 0) {
      like = true;
    }
  });
  Dislike.find({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    if (info.length !== 0) {
      dislike = true;
    }
  });
  res.status(200).json({ success: true, liked: like, disliked: dislike });
});

module.exports = router;
