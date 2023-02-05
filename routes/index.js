const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/cars', require('./cars'));

module.exports = router;
