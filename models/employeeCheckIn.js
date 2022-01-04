const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
ObjectId = Schema.ObjectId;
const EmployeeCheckIn = new Schema({
  userId: {
    type: ObjectId,
    ref: "CreateEmployee"
  },
  date: {
    type: Date,
    default: Date.now
  },
  attendance: {
    type: String
  },
  checkIn: {
    type: String,
    default: Date.now
  },
  day: {
    type: String
  }
});

module.exports = mongoose.model("employeeCheckIn", EmployeeCheckIn);
