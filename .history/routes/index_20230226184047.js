var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
const User = require("../schema/user");
const Question = require("../schema/question");
const { check, validationResult } = require("express-validator/check");

router.get(
  "/all",
  auth,
  async (req, res) => {
    try {
      var questions=await Question.find({}).populate('user')
      return res.status(200).json({ questions });
    } catch (e) {
      res.json({ message: "Error " });
    }
  }
);

router.get(
  "/:id",
  auth,
  async (req, res) => {
    try {
      var questions=await Question.findB({}).populate('user')
      return res.status(200).json({ questions });
    } catch (e) {
      res.json({ message: "Error " });
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
     
    } catch (e) {
      res.json({ message: "Error " });
    }
  }
);

module.exports = router;