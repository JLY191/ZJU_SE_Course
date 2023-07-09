const express = require('express');
const router = express.Router();
const infoHandler = require('../../../router_handler/module3/user/info')

// 获取用户信息路由处理
router.get('/info', infoHandler);

module.exports = router;
