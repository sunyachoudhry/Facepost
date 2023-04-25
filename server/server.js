const express = require('express')
const app = express()
const router = express.Router();

// Used to get data from DB
app.get('/datapoint', (req,res) => {
    res.json({"foods": ["Cheese", "Burger", "Tacos"] })
})

// Used to sent data to the DB
app.post('/info', (req, res) => {
    res.send("Post method has been hit.") 
})

app.listen(9000, console.log("Server is running on port 9000."))