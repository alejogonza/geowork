const jwt = require("jsonwebtoken");
require('dotenv').config();

// User model
const User = require("../models/User");

async function tokenrole(req, res, next) {
  try {
    //get token and decode
    const token = req.headers["token"];
    const decoded = jwt.verify(token, process.env.CONFIG);

    // consult role
    req.userId = decoded.id;
    const userRole = await User.findById(req.userId);
    if (userRole == null || userRole.role != "admin") {
      return res.status(401).json({
        message: "Invalid role",
        auth: false,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error 500",
      auth: false,
      success: false,
      error: error,
    });
  }
  next();
}

module.exports = tokenrole;
