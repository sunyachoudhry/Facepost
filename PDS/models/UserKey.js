const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userKeySchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    sharedKey:{
        type: String, 
        required: true
    },
    clientDHPubKey:{
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('UserKey', userKeySchema)