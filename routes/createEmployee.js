const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Load User model
const createEmployee = require("../models/createEmployee");

// Employee Login
router.post("/login", (req, res) => {
  console.log(req.body);

  const userName = req.body.userName;
  const password = req.body.password;
  console.log(userName);

  // Find admin by userName && password
  createEmployee.findOne({ $and: [{ userName }, { password }] }).then(employeeData => {
    console.log("Employee Data", employeeData);
    // Check if user exists
    // User matched
    // Create JWT Payload
    if (employeeData) {
      const payload = {
        id: employeeData.id,
        employeeData
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
    }
    // if user do not exists
     else {
      return res.json({ message: "Invalid login details" });
    }
  });
});


// REGISTER EMPLOYEE
router.post("/register", (req, res) => {
  createEmployee.findOne({ userName: req.body.userName }).then(employee => {
    if (employee) {
      return res.status(400).json({
        message: `User Name ${req.body.userName} is already taken !`
      });
    } else {
      const newEmployee = new createEmployee({
        userName: req.body.userName,
        password: req.body.password
      });
      newEmployee
        .save()
        .then(employee => res.json(employee))
        .catch(err => console.log(err));
    }
  });
});

// READ EMPLOYEES
router.route("/get-employees").get((req, res) => {
  createEmployee.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Delete Student
router.delete("/delete-employee/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteEmployee = await createEmployee.findByIdAndDelete(_id, req.body);

    if (!_id) {
      return res.status(404).send();
    } else {
      res.send(deleteEmployee);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get Single Student
router.route("/edit-employee/:id").get((req, res) => {
  createEmployee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Student
router.put("/update-employee/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const findEmployee = await createEmployee.findOne({
      userName: req.body.userName
    });
    if (findEmployee) {
      return res.json({
        message: `Employee ${req.body.email} already exists !`
      });
    } else {
      const updateEmployee = await createEmployee.findByIdAndUpdate(_id, req.body, {
        new: true
      });

      res.status(200).send(updateEmployee);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;