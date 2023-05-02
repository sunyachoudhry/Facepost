const express = require('express')
const router = express.Router()
const pdsController = require('../controllers/register'); 

router.post('/register', pdsController.registerUser); 

module.exports = router; 