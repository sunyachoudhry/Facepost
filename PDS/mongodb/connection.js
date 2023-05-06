const mongoose = require('mongoose')
require('dotenv').config({ path: './../.env' })

const connectToMongoDB = async () => {
    await mongoose.connect(process.env.ATLAS_URI).then(() => {
        console.log("Connection to MongoDB was successful");
    })
    .catch((err) => console.log(err));
}

exports.connectToMongoDB = connectToMongoDB