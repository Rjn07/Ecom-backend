const { signup } = require("../CONTROLLER/authController");

module.exports = (app) => {
    app.post("/Ecom/api/v1/auth/signup", signup);
};
