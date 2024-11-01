const mongoose = require("mongoose");

/**
 * name 
 * user id
 * email
 * password
 * usertype
 * 
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 10
    },
    password: {
        type: String, // Corrected the type to String
        required: true
    },
    userType: {
        type: String,
        required: true,
        default: "CUSTOMER", // Corrected default to "CUSTOMER" as a string
        enum: ["CUSTOMER", "ADMIN"] // Specifies allowed values for userType
    }
}, {
    timestamps: true,
    versionKey: false // Automatically adds createdAt and updatedAt fields
});

// Export the model to use in other files
module.exports = mongoose.model("User", userSchema); // This will create a 'users' collection in the database
