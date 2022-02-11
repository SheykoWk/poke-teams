//Dependencies
const jwt = require("jsonwebtoken");

// Controllers
const usersController = require("./users.controller");
const {to} = require('../tools/to')

const loginUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Missing data" });
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({ message: "Missing data" });
    }
    let [err, response] = await to(usersController.checkUserCredentials(req.body.user, req.body.password))
    if (err || !response) {
        return res.status(401).json({ message: "invalid credentials" });
    }
    let user = await usersController.getuserIdFromUserName(req.body.user);
    const token = jwt.sign({ userId: user }, process.env.SECRET_OR_KEY);
    res.status(200).json({
        token: token,
    });
};

exports.loginUser = loginUser
