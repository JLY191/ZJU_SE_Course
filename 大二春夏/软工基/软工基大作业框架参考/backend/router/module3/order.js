const express = require('express');
const router = express.Router();
const orderHandler = require('../../router_handler/module3/order');

// 定义 /order 路由，使用 orderHandler 处理请求
router.post('/order', orderHandler.placeOrder);

module.exports = router;
