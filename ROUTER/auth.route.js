const { signup, login } = require("../CONTROLLER/authController");
const { authVerify, loginCheck } = require("../middleware/authmidlleware");


module.exports = (app) => {
    app.post("/Ecom/api/v1/auth/signup", [authVerify], signup);

    app.post("/Ecom/api/v1/auth/login",[loginCheck], login);
};
