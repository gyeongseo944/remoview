const express = require("express");
const router = express.Router();
const { Comment } = require("../models/comment");

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, doc) => {
    if (err) return res.status(400).send(err);
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, result });
      });
  });
});
router.post("/getComments", (req, res) => {
  Comment.find({ movieId: req.body.movieId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;
