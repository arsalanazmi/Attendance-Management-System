const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CreateEmployee = new Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("create-employees", CreateEmployee);