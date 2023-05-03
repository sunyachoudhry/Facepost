const express = require('express')
const router = express.Router()
const userController = require('../controllers/user'); 

router.post('/createUser', userController.createUser); 
router.post('/checkUser', userController.checkUser);

module.exports = router; 