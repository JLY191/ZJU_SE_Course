const express = require('express');
const router = express.Router();
const orderHandler = require('../../../router_handler/module3/user/order')

// 获取用户历史订单路由处理
router.get('/order', orderHandler);

module.exports = router;
