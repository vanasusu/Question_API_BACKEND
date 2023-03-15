var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
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

router.get("/search", auth, async(req, res) => {
  try {
    const filters = req.query;
    var level=filters.level
    var topic=filters.topic
    var subject=filters.subject
    
    const objs = await Product.find({productName:{ $regex:'.*'+findname+'.*'} });

    var questions = await Question.find({})
   return res.status(200).json({message:"Hello"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Error" });
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
    return res.status(500).json({ error: "Error" });
  }
});

router.put(
  "/:id",
  auth,
  check("level", "Please enter a valid difficulty level").isIn([
    "Easy",
    "Medium",
    "Hard",
  ]),
  async (req, res) => {
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
      return res.status(500).json({ error: "Error" });
    }
  }
);

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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const question = new Question({
        user: req.user.id,
        ...req.body,
      });
      await question.save();
      return res.status(200).json({ message: "Question has been published" });
    } catch (error) {
      return res.status(500).json({ error: "Error" });
    }
  }
);



module.exports = router;
