const express = require('express');
require("dotenv").config()

const app = express();
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
    
})

app.post("/team/pokemons", (req, res) => {
    res.status(200).send('Hello World!')

})
app.get("/team", (req, res) => {
    res.status(200).send('Hello World!')

})
app.delete("team/pokemons/:id", (req, res) => {
    res.status(200).send('Hello World!')

})
app.put("/team", (req, res) => {
    res.status(200).send('Hello World!')

})



app.listen(port, () => {
    console.log(`Express server started at port ${port}`)
})
