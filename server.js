const express = require("express");
const app = express();
const admin = require("./routes/admin");
const createEmployee = require("./routes/createEmployee");
const employee = require("./routes/employee");

const cors = require("cors");

//  middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// Envirnmental Variables
require('dotenv').config()

// Database Connection
const database = require('./database/db');

//Cors
app.use(cors());

// Routes
app.use("/admin", admin);
app.use("/create-employee", createEmployee);
app.use("/employee", employee);

//Heroku
// if (process.env.NODE_ENV == "production") {
//     app.use(express.static("client/build"));
// }

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));