const express = require('express');
const router = express.Router();
const { getCommodityInfoHandler }  = require('../../router_handler/module3/display');

// 查询商品信息
router.post('/display', getCommodityInfoHandler);

module.exports = router;
