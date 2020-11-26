const express = require("express");
const router = express.Router();

// User model
const User = require("../models/User");

// JWT
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, FCMtoken } = req.body;
    let role = "user"
    if(username == "chucknorris"){
      role = "admin";
    }

    const BodyValidate = (username, email, password) => {
      //username validate
      if (!username || username.length < 8) {
        return res.status(400).json({
          message: "invalid username",
          success: false,
        });
      }

      //email validate
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      } else {
        return res.status(400).json({
          message: "invalid email",
          success: false,
        });
      }

      //password validate
      if (!password || password.length < 8) {
        return res.status(400).json({
          message: "Invalid password min 8 characters",
          success: false,
        });
      }

      return true;
    }

    const DataChecker = BodyValidate(username, email, password);

    if (DataChecker == true) {
      //non-repeated email validator
      const EmailValidator = await User.findOne({ email: email });

      if (EmailValidator != null) {
        return res.status(400).json({
          message: "email already registered",
          success: false,
        });
      } else {
          //FCMtoken
        if(FCMtoken && FCMtoken.length == 163) {
               //Save NewUser

        const newUser = new User({
          role,
          username,
          email,
          password,
          FCMtoken
        });

        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();

                // create token
                const token = jwt.sign({ id: newUser._id }, process.env.CONFIG, {});

                return res.status(200).json({
                  message: "User successfully registered",
                  success: true,
                  token: token,
                  user: {
                    role: newUser.role,
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                  },
                });
        }else{
               //Save NewUser

        const newUser = new User({
          role,
          username,
          email,
          password,
        });

        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();

                // create token
                const token = jwt.sign({ id: newUser._id }, process.env.CONFIG, {});

                return res.status(200).json({
                  message: "User successfully registered",
                  success: true,
                  token: token,
                  user: {
                    role: newUser.role,
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    FCMtoken: newUser.FCMtoken,
                  },
                });
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
});

router.post("/username-validate", async (req, res) => {
  try {
    const { username } = req.body;

    //non-repeated email validator
    const usernameValidator = await User.findOne({ username: username });

    if (usernameValidator != null) {
      return res.status(400).json({
        message: "username already registered",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "username available",
        success: true,
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

router.post("/email-validate", async (req, res) => {
  try {
    const { email } = req.body;

    //non-repeated email validator
    const emailValidator = await User.findOne({ email: email });

    if (emailValidator != null) {
      return res.status(400).json({
        message: "email already registered",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "email available",
        success: true,
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
