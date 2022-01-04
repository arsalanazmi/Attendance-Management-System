const mongoose = require("mongoose");
const DB = process.env.DATABASE;

// Connecting mongoDB Database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database sucessfully connected!");
}).catch(error => {
    console.log("Could not connect to database : " + error);
});