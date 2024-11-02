// /**
//  * write the logic of the signup or register of the user
//  */

const bcrypt = require("bcrypt");
const usermodel = require("../MODEL/usermodel");
const authConfig = require("../config/auth.config");

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



// const login =async (req,res)=>{

//     // check the user is presennt inn the system or nnot
//     const user = await usermodel.findOne({userid :req.body.userid})

//     if(user==null){
//         return res.status(500).send({
//             message: "userid and password is invalid"
//         })
//     }
//     //check password is correct or not 

//     const validPass = await bcrypt.compare(req.body.password ,user.password);
//     if(!password){
//         return res.status(401).send({
//             message: "password is incorrect"
//         })

//     }

//     //using jwt we ll  create the token with a given ttl and return
//   const token = jwt.sign(
//         { userid: user._id, email: user.email },
//         authConfig,
//         { expiresIn: "1h" } // Token expires in 1 hour
//     );
// res.status(200).send({
//     message: "Login successful",
//     token: token,
// });


// }


const jwt = require("jsonwebtoken");


const login = async (req, res) => {
    try {
        console.log("yaha aya tha me")
        // Check if email and password are provided
        const { userid, password } = req.body;
        if (!userid || !password) {
            return res.status(400).send({
                message: "Email and password are required",
            });
        }

        // Find user by email
        const user = await usermodel.findOne({userid:req.body.userid}  );
        if (!user) {
            return res.status(404).send({
                message: "User not found",
            });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(req.body.password ,user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid password",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userid: user._id },
            authConfig.secret,
            { expiresIn: "1h" } // Token expires in 1 hour
        );

        // Send response with token
        res.status(200).send({
            message: "Login successful",
            token: token,
        });
    } catch (error) {
        console.log("Error during login", error);
        res.status(500).send({
            message: "An error occurred during login",
        });
    }
};

module.exports ={signup,login}