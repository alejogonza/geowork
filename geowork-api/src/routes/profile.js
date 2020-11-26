const express = require("express");
const router = express.Router();

// helpers
const TokenVerify = require("../helpers/validtoken");

// User model
const User = require("../models/User");

router.get("/auth/me", TokenVerify, async (req, res) => {
  try {
    const userId = req.userId

    const UserData = await User.findById(userId);

    //email exist validate
    if (!UserData) {
      return res.status(400).json({
        message: "email not registered",
        success: false,
      });
    }else{
        return res.status(200).json({
            user: {
                role: UserData.role,
                _id: UserData._id,
                username: UserData.username,
                email: UserData.email,
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

router.patch("/me", TokenVerify, async (req, res) => {
    try {
        const { username, email, password } = req.body;

      const userId = req.userId
  
      const UserData = await User.findById(userId);

    const BodyValidate = async (username, email, password) => {
        //username validate

        if (username != undefined && username.length < 8) {
           res.status(400).json({
            message: "invalid username",
            success: false,
          });
          return false;
        }else{
            const existingUser = await User.findOne({ username: username });
            if (existingUser != null) {
                 res.status(400).json({
                  message: "Username already registered",
                  success: false,
                });
          return false;

            }
        }
  
        //email validate
     if(email != undefined){
        if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
            const existingEmail = await User.findOne({ email: email });
            if (existingEmail != null) {
                 res.status(400).json({
                  message: "Email already registered",
                  success: false,
                });
          return false;

            }
        } else {
           res.status(400).json({
            message: "invalid email",
            success: false,
          });
          return false;

        }
    }
        //password validate
        if (password != undefined && password.length < 8) {
           res.status(400).json({
            message: "Invalid password min 8 characters",
            success: false,
          });
          return false;

        }
  
        return true;
      }

      if (!UserData) {
        return res.status(400).json({
          message: "user not found",
          success: false,
        });
      }else{

        const DataChecker = await BodyValidate(username, email, password);
      
 
   if(DataChecker == true){
       const data = {
           username: username,
           email: email,
           password: password
       }
      
       if(password != undefined){
        data.password = await UserData.encryptPassword(password);
       }

       for(let prop in data) if(!data[prop]) delete data[prop];

       UserData.set(data);
       await UserData.save();
    
          return res.status(200).json({
              user: {
                  role: UserData.role,
                  _id: UserData._id,
                  username: UserData.username,
                  email: UserData.email,
                },
            });
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
  
router.patch("/FCMtoken-renew", TokenVerify, async (req, res) => {
    try {
      
        const { FCMtoken } = req.body;
        const userId = req.userId;
        const UserData = await User.findById(userId);

        if(FCMtoken && FCMtoken.length == 163) {
          UserData.set({
            FCMtoken: FCMtoken,
          });
          await UserData.save();

          return res.status(200).json({
            message: "FCMtoken updated",
            success: true,
            user: {
                FCMtoken: UserData.FCMtoken,
              },
          });
        }else{
          return res.status(400).json({
            message: "FCMtoken is invalid",
            success: false,
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
