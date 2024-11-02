const usermodel = require("../MODEL/usermodel");

 const authVerify = async (req, res, next) => {
    try {
        // Check for name
        if (!req.body.name) {
            return res.status(400).send({
                message: "name is not defined"
            });
        }

        // Check for email
        if (!req.body.email) {
            return res.status(400).send({
                message: "email is not defined"
            });
        }

        // Check for userid
        if (!req.body.userid) {
            return res.status(400).send({
                message: "userid is not defined"
            });
        }
        
        // Check if user already exists in the database
        const user = await usermodel.findOne({ userid: req.body.userid });
        if (user) {
            console.log("User already exists");
            return res.status(400).send({
                message: "User is already present in the database"
            });
        }

        // If all checks pass, proceed to the next middleware
        next();
        
    } catch (error) {
        console.log("Error while verifying the details", error);
        res.status(500).send({
            message: "Error while validating the request body"
        });
    }
};

const loginCheck =(req,res ,next)=>{
    if (!req.body.userid) {
        return res.status(400).send({
            message: "userid is not defined"
        });
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "password is not defined"
        });
    }
    next();
}
module.exports={authVerify,loginCheck}