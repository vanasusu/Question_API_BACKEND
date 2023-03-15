var express = require('express');
var router = express.Router();
var auth=require('../middleware/auth')

router.get("/", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    console.log(req.user)
    const user = await User.findById(req.user.id);
    console.log(user)
    res.json(user);
  } catch (e) {
    res.json({ message: "Error in Fetching user" });
  }
});

module.exports = router;
