const express = require("express");
const mongoose = require("mongoose");
const serverjs = require("./config/servercnf");
const dbconfig = require("./config/dbconfig");
const user_model = require('./MODEL/usermodel'); // Ensure this is correctly imported
const bcrypt = require("bcrypt");


const app = express();
 

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(dbconfig.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to the database");
});

db.once("open", () => {
    console.log("Connected to the Mongo database");
    init(); // Call init after MongoDB is connected
});

async function init() {
    try {
        let user = await user_model.findOne({ userid: "admin" });

        if (user) { 
            console.log("User is already present");
            return;
        }

        user = await user_model.create({
            name: "Rajan",
            userid: "admin",
            email: "rjn004@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("welcome1", 8),
        });

        console.log("Admin created:", user);
    } catch (err) {
        console.log("Error while reading or creating the data:", err);
    }
}
///routigs

require("./ROUTER/auth.route")(app); //callig routes annd pasing objects


app.listen(serverjs.PORT, () => {
    console.log("Server is started and running at the PORT:", serverjs.PORT);
});
