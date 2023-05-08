const express = require('express')
const router = express.Router()
const userController = require('../controllers/user'); 

router.post('/getKeys', userController.getKeys); 

module.exports = router; 