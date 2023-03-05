const express = require("express");
const {check,validationResult}=require("express-validator/check")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../schema/user");

router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
    check("role", "Please enter a valid role").isIn(['Tutor', 'Teacher', 'Student']),
  ],
  async (req, res) => {
    console.log(req)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, email, password,role } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          message: "User Already Exists",
        });
      }

      user = new User({
        username,
        email,
        password,role
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role:role
        },
      };

      jwt.sign(
        payload,
        process.env.JWTCODE,
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,username,role
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).json( { message: "Server Error"});
    }
  }
);

router.post(
    "/login",
    [
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id,
            role:user.role
          }
        };
  
        jwt.sign(
          payload,
          process.env.JWTCODE,
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );


module.exports = router;
