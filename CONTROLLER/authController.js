// /**
//  * write the logic of the signup or register of the user
//  */

const bcrypt = require("bcrypt");
const usermodel = require("../MODEL/usermodel");

const signup = async (req, res) => {
    /** Logic to create user */

    // 1. Read the request body
    const request_body = req.body; // request_body is in the form of a JS object

    // 2. Create a user object
    const userObj = {
        name: request_body.name,
        userid: request_body.userid,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8),
    };

    try {
        // 3. Insert the data into the user collection in MongoDB
        const user_created = await usermodel.create(userObj);

        // 4. Send a success response

        const return_response= {
            name:user_created.name,
            email: user_created.email,
            userid:user_created.userid,
            usertype:user_created.userType

        }
        res.status(201).send(return_response);
    } catch (error) {
        console.log("Error while registering the user:", error);
        res.status(500).send({
            message: "An error occurred while registering the user",
        });
    }
};      
module.exports ={signup}