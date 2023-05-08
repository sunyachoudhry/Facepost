const express = require('express')
const cors = require('cors');
const app = express()
const userRoutes = require('./routes/user'); // import the routes
const { createDiffieHellman, generateKeyPairSync, generateKeyPair } = require('crypto');

app.use(express.json());
app.use(cors());
app.use('/', userRoutes); //to use the routes


app.listen(9000, console.log("Server is running on port 9000."))