var express = require("express");
var router = express.Router();
var auth = require("../middleware/auth");
const User = require("../schema/user");
const Question = require("../schema/question");

router.get(
  "/",
  auth,
  [
    check("subject", "Please Enter a Valid Subject").not().isEmpty(),
    check("topic", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
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
