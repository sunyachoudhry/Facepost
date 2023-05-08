const express = require('express')
const router = express.Router()
const pdsController = require('../controllers/register'); 

router.get('/getKeys', pdsController.getKeys);
router.post('/createEntry', pdsController.createEntry)

module.exports = router; 