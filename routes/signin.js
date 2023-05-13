const express = require("express")
const router = express.Router();
const userInfo = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

router.post("/api/v4/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userInfo.find({ email });
        if (!userData[0]) {
            return res.status(400).json({
                message: "User not exist"
            })
        }
        bcrypt.compare(password, userData[0].password, async function (err, result) {
            if (err) {
                console.log(err)
                return res.status(400).json({
                    message: err
                })
            }
            if (result) {
                const Token = await jwt.sign({
                    data: userData[0].id
                }, process.env.SECRET_KEY, { expiresIn: '24h' });

                return res.status(200).json({
                    message: `${userData[0].username}  login successfully`,
                    Token
                })
            } else {
                return res.status(400).json({
                    message: " incorrect password",
                })
            }
        })
    } catch (e) {
        return res.status(400).json({
            message: e.message
        })
    }

})
module.exports = router;