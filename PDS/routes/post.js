const express = require('express')
const router = express.Router()
const userController = require('../controllers/post'); 

router.post('/uploadPost', userController.uploadPost); 

module.exports = router; 