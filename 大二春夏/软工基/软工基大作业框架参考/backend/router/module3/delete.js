const express = require('express');
const router = express.Router();
const { deleteCommodityInfoHandler }  = require('../../router_handler/module3/delete');

// 查询管理员可管理商品信息
router.post('/delete', deleteCommodityInfoHandler);

module.exports = router;
