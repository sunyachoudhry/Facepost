const express = require('express')
const router = express.Router()
const pdsController = require('../controllers/register'); 

router.post('/register', pdsController.registerUser); 
router.post('/createUserKeyEntry', pdsController.createUserKeyEntry); 

module.exports = router; 