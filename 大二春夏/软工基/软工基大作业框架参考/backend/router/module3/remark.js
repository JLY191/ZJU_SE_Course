const express = require('express');
const router = express.Router();
const remarkHandler = require('../../router_handler/module3/remark');

// POST /m3/remark
router.post('/remark', remarkHandler);

module.exports = router;
