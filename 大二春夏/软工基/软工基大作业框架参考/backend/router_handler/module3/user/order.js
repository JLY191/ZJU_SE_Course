const jwt = require('jsonwebtoken');
const config = require('../../../config');
const db = require('../../../db');

const orderHandler = (req, res) => {
    const module3Token = req.cookies['module3_token'];

    if (!module3Token) {
        res.send({
            status: 1,
            message: 'Token not found',
        });
        return;
    }

    // 解析 cookie 获取 user_id
    let userId;
    try {
        const decoded = jwt.verify(module3Token, config.jwtSecretKeyM3);
        userId = decoded.user_id;
    } catch (error) {
        res.send({
            status: 1,
            message: 'Invalid token',
        });
        return;
    }

    // 查询用户订单
    db.query('SELECT * FROM module3_order WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
            res.send({
                status: 1,
                message: 'Error occurred while fetching user orders',
            });
        } else {
            res.send({
                status: 0,
                message: 'User orders retrieved successfully',
                orders: results,
            });
        }
    });
};

module.exports = orderHandler;
