// Dependencies
const router = require("express").Router();
const jwt = require("jsonwebtoken");

// Controllers
const usersController = require("./users.controller");


router.route("/").get((req, res) => {
    res.send("Auth router");
});

router.route("/login").post((req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Missing data" });
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({ message: "Missing data" });
    }
    usersController.checkUserCredentials(
        req.body.user,
        req.body.password,
        (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: "invalid credentials" });
            }
            let user = usersController.getuserIdFromUserName(req.body.user)
            const token = jwt.sign(
                { userId: user },
                process.env.SECRET_OR_KEY
            );
            res.status(200).json({
                token: token,
            });
        }
    );
});

exports.router = router;
