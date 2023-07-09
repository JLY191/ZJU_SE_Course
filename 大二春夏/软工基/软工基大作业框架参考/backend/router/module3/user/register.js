const express = require('express');
const router = express.Router();
const registerHandler = require('../../../router_handler/module3/user/register')

// 注册路由处理
router.post('/register', registerHandler);

module.exports = router;
