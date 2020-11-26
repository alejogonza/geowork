const express = require("express");
const router = express.Router();

// JWT
const jwt = require("jsonwebtoken");
require('dotenv').config();

// User model
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const { email, password, FCMtoken } = req.body;

    //email validate
    if (!email) {
      return res.status(400).json({
        message: "Enter your email",
        success: false,
      });
    }

    //password validate
    if (!password) {
      return res.status(400).json({
        message: "Enter your password",
        success: false,
      });
    }

    const UserData = await User.findOne({ email: email });

    //email exist validate
    if (!UserData) {
      return res.status(400).json({
        message: "email not registered",
        success: false,
      });
    }

    //password match validate
    const matchpass = await UserData.matchPassword(password);

    if (!matchpass) {
      return res.status(401).json({
        message: "Incorrect password",
        user: null,
        success: false,
        token: null,
      });
    } else {
      // create token
      const token = jwt.sign({ id: UserData._id }, process.env.CONFIG, {});
      if(UserData.FCMtoken == undefined && FCMtoken && FCMtoken.length == 163){ 
        UserData.set({
          FCMtoken: FCMtoken,
        });
        await UserData.save()
      }
      return res.status(200).json({
        message: "Successful login",
        auth: true,
        token: token,
        user: {
          role: UserData.role,
          _id: UserData._id,
          username: UserData.username,
          email: UserData.email,
          FCMtoken: UserData.FCMtoken
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
});

module.exports = router;
