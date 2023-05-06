const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    digitalSig: {
        type: String,
        required: true
    },
    poster:{
        type: String,
        required: true
    },
    encryptedPost: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Post', postSchema)