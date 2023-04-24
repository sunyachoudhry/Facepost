const express = require('express')
const app = express()

app.get("/Datapoint", (req,res) => {
    res.json({"foods": ["a", "b", "c"]})
})
app.listen(9000, console.log("Server is running on port 9000."))