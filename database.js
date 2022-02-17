const mongoose = require("mongoose");
require("dotenv").config();

const password = process.env.PSWD_DATABASE;
let database = process.env.DATABASE;

if(process.env.NODE_ENV === 'test'){
    database = 'testdb'
}

const url = `mongodb+srv://sh3yk0:${password}@cluster0.emkcx.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


