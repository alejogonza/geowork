const express = require("express");
const router = express.Router();
const axios = require("axios");

// user model
const User = require("../models/User");

// jobs model
const Job = require("../models/jobs");

// helpers
const TokenVerify = require("../helpers/validtoken");
const RoleVerify = require("../helpers/roletoken");

require('dotenv').config();

router.post("/create-job", TokenVerify, RoleVerify, async (req, res) => {
  try {
    const num = parseInt(req.body.jobs);
    if (typeof num != "number" || isNaN(num)) {
      return res.status(400).json({
        message: "jobs must be a number",
        success: false,
        auth: true,
      });
    }
    let jobs = [];
    const getRandomLatLng = () => {
      return {
        lat: 4.9 + -2.1 * Math.random(),
        lng: -75.45 + -1.2 * Math.random(),
      };
    };
    const payRandom = () => {
      const cal = (Math.random() * (1000 - 1) + 1).toFixed(2);
      return cal;
    };

    for (a = 0; a < num; a++) {
      let coords = getRandomLatLng();
      let usd = payRandom();
      var title = `job #${Math.floor(Math.random() * (19 - 1)) + 1}`;
      var pay = `$${usd} USD`;
      var description = `this job pays ${payRandom()} dollars and is located in ${
        coords.lat
      }, ${coords.lng}`;
      jobs.push({
        title,
        description,
        coords,
        pay,
      });

      const newJob = new Job({
        title,
        description,
        coords,
        pay,
      });
      await newJob.save();
    }

    return res.status(200).json({
      message: "Job successfully registered",
      success: true,
      auth: true,
      jobs,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
});

router.get("/info", TokenVerify, RoleVerify, async (req, res) => {
  try {
    let adminInfo = await User.findById(req.userId);
    let jobs = await Job.find();
    let users = await User.find();
    return res.status(200).json({
      success: true,
      auth: true,
      admin: adminInfo.username,
      jobs: jobs.length,
      users: users.length - 1,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error 500",
      error: err,
    });
  }
});

router.get("/send-notifications", TokenVerify, RoleVerify, async (req, res) => {
  try {
    const adminId = req.userId;
    let users = await User.find();
    let success = [];

    for (var i = 0; i < users.length; i++) {
         if(users[i].id != adminId){
      try {
        const notification = await axios.post(
          "https://fcm.googleapis.com/fcm/send",
          {
            notification: {
              body: "New jobs have been added for you!",
              title: "New jobs available!",
              default_sound: true,
              visibility: "public",
              notification_priority: "PRIORITY_MAX",
              priority: "high",
              lights: true,
              vibration: true,
            },
            to: users[i].FCMtoken,
          },
          {
            headers: {
              Authorization: process.env.FCMTOKEN,
            },
          }
        );
        success.push(notification.data);
      } catch (err) {
        console.log(err);
      }
      }
    }

    if (success.length > 0) {
      return res.status(200).json({
        success: true,
        message: `${success.length} users successfully notified`,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No users with notifications available",
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
