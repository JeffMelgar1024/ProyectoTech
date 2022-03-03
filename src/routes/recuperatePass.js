const express = require('express');
const router = express.Router();
const recuperatePassController = require('../controllers/recuperatePass');

router.post('/recuperate', recuperatePassController.recuperatePass);

router.get('/recuperate/:token', recuperatePassController.recuperatePassToken);

module.exports = router;