var express = require('express');
var router = express.Router();
var auth=require('../middleware/auth')
const User = require("../schema/user");
const Question = require("../schema/question");

router.get("/", auth, async (req, res) => {
  try {
    
    console.log(req.user)
    const user = await User.findById(req.user.id);
    console.log(user)
    res.json(user);
  } catch (e) {
    res.json({ message: "Error " });
  }
});

module.exports = router;
