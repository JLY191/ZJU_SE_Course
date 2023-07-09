const express = require('express');
const router = express.Router();
const searchHandler = require('../../router_handler/module3/search');

router.post('/search', searchHandler);

module.exports = router;
