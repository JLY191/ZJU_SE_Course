const express = require('express');
const router = express.Router();
const logoutHandler = require('../../../router_handler/module3/user/logout')

// 登出路由处理
router.get('/logout', logoutHandler);

module.exports = router;
