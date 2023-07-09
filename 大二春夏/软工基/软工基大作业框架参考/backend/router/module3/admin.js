const express = require('express');
const router = express.Router();
const { getAdminCommodityInfoHandler }  = require('../../router_handler/module3/admin');

// 查询管理员可管理商品信息
router.post('/adminDisplay', getAdminCommodityInfoHandler);

module.exports = router;
