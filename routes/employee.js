const express = require("express");
const router = express.Router();
require("dotenv").config();

// Load User model
const EmployeeCheckIn = require("../models/employeeCheckIn");
const EmployeeCheckOut = require("../models/employeeCheckOut");

// CheckIn
router.post("/checkIn/:id", async (req, res) => {
  var today = new Date();
  var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const employeeCheckIn = new EmployeeCheckIn({
    userId: req.params.id,
    Date: Date.now(),
    checkIn: new Date().toLocaleTimeString("en-US"),
    attendance: "PRESENT",
    day: date
  });
  employeeCheckIn
    .save()
    .then(() => console.log("Check In Successfull", employeeCheckIn))
    .catch(e => console.log(e));
});

// Check Out
router.post("/checkOut/:id", (req, res) => {
  var today = new Date();
  var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  const employeeCheckOut = new EmployeeCheckOut({
    userId: req.params.id,
    checkOut: new Date().toLocaleTimeString("en-US"),
    day: date
  });
  employeeCheckOut
    .save()
    .then(() => console.log("Check Out Successfull", employeeCheckOut))
    .catch(e => console.log(e));
});

// READ EMPLOYEE CheckIn Time
router.route("/employee-checkIn").get((req, res) => {
  EmployeeCheckIn.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// READ EMPLOYEE CheckOut Time
router.route("/employee-checkOut").get((req, res) => {
  EmployeeCheckOut.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
