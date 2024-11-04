const authConfig = require("../config/auth.config");
const usermodel = require("../MODEL/usermodel");
const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
    // Retrieve token from headers
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({
            message: "No token found: Unauthorized user"
        });
    }

    try {
        // Verify token validity
        const decode = jwt.verify(token, authConfig.secret);

        // Find user associated with the decoded token
        const user = await usermodel.findOne({ userid: decode.id });
        if (!user) {
            return res.status(401).send({
                message: "Unauthorized user: User not associated with this token"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(500).send({
            message: "Error in token validation"
        });
    }
};

const adminCheck = (req, res, next) => {
    const user = req.user;
    if (user && user.userType === "ADMIN") {
        next();
    } else {
        return res.status(401).send({
            message: "Unauthorized user: User is not an ADMIN"
        });
    }
};

module.exports = { tokenVerify, adminCheck };
