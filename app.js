// Dependencies
const express = require("express");
require("dotenv").config();

// Routes
const authRoutes = require("./auth/auth.router").router;
const teamRoutes = require("./teams/teams.router").router;

const { setupMiddlewares } = require("./middlewares");
require('./database')

const app = express();

const port = process.env.PORT || 3000;

setupMiddlewares(app)

app.get("/", (req, res) => {
    res.status(200).send("Welcome to Poke-Team, an API made with Express and MongoDB!");
});

app.use("/auth", authRoutes);
app.use("/team", teamRoutes);

app.listen(port, () => {
    console.log(`Express server started at port ${port}`);
});

exports.app = app;
