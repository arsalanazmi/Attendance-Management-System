const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
ObjectId = Schema.ObjectId;
const EmployeeCheckOut = new Schema({
  userId: {
    type: ObjectId,
    ref: "CreateEmployee"
  },
  checkOut: {
    type: String,
    default: Date.now
  },
  day: {
    type: String
  }
});

module.exports = mongoose.model("employeeCheckOut", EmployeeCheckOut);
