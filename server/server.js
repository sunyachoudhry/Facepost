const express = require('express')
const app = express()
const User = require('./models/User')
const { connectToMongoDB } = require('./mongodb/connection')
const userRoutes = require('./routes/user'); // import the routes

app.use(express.json());

app.use('/', userRoutes); //to use the routes

// Create connection to MongoDB
connectToMongoDB()
// Connect to specific port
app.listen(9000, console.log("Server is running on port 9000."))