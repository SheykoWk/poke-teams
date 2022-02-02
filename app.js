// Dependencies
const express = require("express");
require("dotenv").config();

// Routes
const authRoutes = require("./auth/auth.router").router;
const teamRoutes = require("./teams/teams.router").router;
const { setupMiddlewares } = require("./middlewares");

const app = express();

const port = process.env.PORT || 3000;

setupMiddlewares(app)


app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/team", teamRoutes);

app.listen(port, () => {
    console.log(`Express server started at port ${port}`);
});

exports.app = app;
