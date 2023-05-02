const express = require('express')
const registerRoutes = require('./routes/register'); // import the routes
const postRoutes = require('./routes/post'); // import the routes
const app = express()

app.use(express.json());

app.use('/', registerRoutes);

app.use('/', postRoutes)

app.listen(9500, console.log("Server is running on port 9500."))

