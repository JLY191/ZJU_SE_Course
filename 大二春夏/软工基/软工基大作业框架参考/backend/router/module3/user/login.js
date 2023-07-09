const express = require('express');
const router = express.Router();
const loginHandler = require('../../../router_handler/module3/user/login')

// 登录路由处理
router.post('/login', loginHandler);

module.exports = router;
