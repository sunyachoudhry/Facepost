const express = require('express')
const unlinkFile = util.promisify(fs.unlink)
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
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