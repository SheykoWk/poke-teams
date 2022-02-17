// Dependencies
const router = require("express").Router();

const authHttpHandler = require('./auth.http')

router.route("/login")
    .post(authHttpHandler.loginUser);
router.route("/signin")
    .put(authHttpHandler.signInUser)
exports.router = router;
