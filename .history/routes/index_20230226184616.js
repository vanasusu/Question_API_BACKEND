var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
const User = require("../schema/user");
const Question = require("../schema/question");
const { check, validationResult } = require("express-validator/check");

router.get("/all", auth, async (req, res) => {
  try {
    var questions = await Question.find({}).populate("user");
    return res.status(200).json({ questions });
  } catch (e) {
    res.json({ message: "Error " });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    var questions = await Question.findById(req.params.id).populate("user");
    return res.status(200).json({ questions });
  } catch (e) {
    res.json({ message: "Error " });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("user");
    if (question.user._id == req.user.id) {
      await question.deleteOne();
      return res.status(200).json({ message: "The question has been deleted" });
    } else {
      res.json({ message: "You can delete only your question" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.put("/:id",auth, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("user");
    if (question.user._id == req.user.id) {
      await question.updateOne({
        ...req.body,
      });
      return res.status(200).json({ message: "Question has been updated" });
    } else {
      res.json({ message: "You can update only your question" });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error' });
  }
});


router.post(
  "/",
  auth,
  [
    check("subject", "Please Enter a valid Subject").not().isEmpty(),
    check("topic", "Please enter a valid Topic").not().isEmpty(),
    check("level", "Please enter a valid difficulty level").isIn([
      "Easy",
      "Medium",
      "Hard",
    ]),
  ],
  async (req, res) => {
    try {
      const post = new Post({
        user: req.user._id,
        ...req.body,
      });
      const post2 = await post.save();
      const postdata = await Post.findById(post2._id).populate("user");
      return res
        .status(200)
        .json({ posts: postdata, msg: "Post has been published" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;