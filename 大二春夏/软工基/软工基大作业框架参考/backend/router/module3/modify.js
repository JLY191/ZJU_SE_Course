const express = require('express');
const router = express.Router();
const { modifyHandler } = require('../../router_handler/module3/modify');

router.post('/modify', modifyHandler);

module.exports = router;
