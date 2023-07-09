const express = require('express');
const router = express.Router();
const { addCommodityInfoHandler }  = require('../../router_handler/module3/add');

// 查询管理员可管理商品信息
router.post('/add', addCommodityInfoHandler);

module.exports = router;
