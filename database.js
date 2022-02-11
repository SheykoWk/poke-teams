const mongoose = require("mongoose");
require("dotenv").config();

const password = 'SkWk216850047191217'//process.env.PSWD_DATABASE;
const database = 'db'//process.env.DATABASE;

const url = `mongodb+srv://sh3yk0:${password}@cluster0.emkcx.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Cat = mongoose.model("Cat", { name: String });

const kitty = new Cat({ name: "Zildjian" });
kitty.save().then(() => console.log("meow"));
