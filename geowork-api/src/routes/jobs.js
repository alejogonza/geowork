const express = require("express");
const router = express.Router();

// jobs model
const Job = require("../models/jobs");

// helpers
const TokenVerify = require("../helpers/validtoken");

router.get("/jobs", TokenVerify, async (req, res) => {
  try {
    let jobs = await Job.find();
    if(jobs.length == 0) {
      return res.status(200).json({
        message: "No jobs found",
        auth: true,
        success: true
      });
    }else{
      return res.status(200).json({
        success: true,
        auth: true,
        jobs
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
