const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Load User model
const Admin = require("../models/admin");

// @route POST admin//login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
  console.log(req.body);

  const userName = req.body.userName;
  const password = req.body.password;
  console.log(userName);

  // Find admin by userName && password
  Admin.findOne({ $and: [{ userName }, { password }] }).then(adminData => {
    console.log("admin Data", adminData);
    // Check if user exists
    // User matched
    // Create JWT Payload
    if (adminData) {
      const payload = {
        id: adminData.id,
        adminData
      };
      // Sign token
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        {
          expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
          console.log("token", token);
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    } else {
      // if user do not exists
      // .catch(() => {
      return res.json({ message: "Invalid login details" });
    }
    // );
  });
});

module.exports = router;
