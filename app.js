const express = require("express");
const app = express();

const signup = require("./routes/signup")
const signin = require("./routes/signin");
const offer = require("./routes/offer")

const jwt = require("jsonwebtoken");
require("dotenv").config();
const cors = require("cors");

const conn = require("./config/connection");
conn();

const PORT = 8080

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    try {
        if (req.url == "/api/v4/login" || req.url == "/api/v4/signup") {
            next();
        } else {
            let token = req.headers.authorization;
            jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
                if (err) {
                    return res.status(400).json({
                        message: err.message
                    })
                }
                res.user = decoded.data;
                next()
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

})


app.use("/", signup);
app.use("/", signin);
app.use("/", offer)

app.listen(PORT, () => { console.log(`server listening at ${PORT}`) })