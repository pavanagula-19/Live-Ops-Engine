const { body } = require("express-validator");
exports.userSignupValidation = [
    body("username").isAlpha(),
    body("email").isEmail(),
    body("password").matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/)
];
