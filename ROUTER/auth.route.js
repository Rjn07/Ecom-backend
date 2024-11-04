const { signup, login, categoryCreate } = require("../CONTROLLER/authController");
const { authVerify, loginCheck } = require("../middleware/authmidlleware");
const { tokenVerify, adminCheck } = require("../middleware/categorymiddleware");


module.exports = (app) => {
    app.post("/Ecom/api/v1/auth/signup", [authVerify], signup);

    app.post("/Ecom/api/v1/auth/login",[loginCheck], login);
    app.post("/Ecom/api/v1/auth/category",[tokenVerify] ,[adminCheck],categoryCreate);
};
