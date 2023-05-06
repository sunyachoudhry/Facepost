const express = require('express')
const util = require('util')
const fs = require('fs')
const multer = require('multer')
//const upload = multer({ dest: 'uploads/' })
const unlinkFile = util.promisify(fs.unlink)
const app = express()

const uploadPost = (async (req, res) => {
    const file = req.file
    console.log(file)
  
    const result = await uploadFile(file)
    await unlinkFile(file.path)
})

module.exports = {
    uploadPost
}