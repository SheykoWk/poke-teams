// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// Routes
const authRoutes = require("./routers/auth").router;
const teamRoutes = require("./routers/teams").router;

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
});

app.use("/auth", authRoutes);
app.use("/team", teamRoutes);

app.listen(port, () => {
    console.log(`Express server started at port ${port}`);
});

exports.app = app;
