var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
const User = require("../schema/user");
const Question = require("../schema/question");
const {check,validationResult}=require("express-validator/check")
router.get(
  "/",
  auth,
  [
    check("subject", "Please Enter a valid Subject").not().isEmpty(),
    check("topic", "Please enter a valid Topic").not().isEmpty(),
    check("level", "Please enter a valid difficulty level").e,
  ],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      console.log(user);
      res.json(user);
    } catch (e) {
      res.json({ message: "Error " });
    }
  }
);

module.exports = router;
