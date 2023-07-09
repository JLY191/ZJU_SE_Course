const jwt = require('jsonwebtoken');
const config = require('../../../config');
const db = require('../../../db');

const infoHandler = (req, res) => {
    const module3Token = req.cookies['module3_token'];

    if (!module3Token) {
        res.send({
            status: 1,
            message: 'Token not found',
        });
        return;
    }

    jwt.verify(module3Token, config.jwtSecretKeyM3, (err, decoded) => {
        if (err) {
            res.send({
                status: 1,
                message: 'Invalid token',
            });
        } else {
            const userId = decoded.user_id;

            // 根据 user_id 查询数据库中用户信息
            db.query('SELECT * FROM module3_users WHERE user_id = ?', [userId], (error, results) => {
                if (error) {
                    res.send({
                        status: 1,
                        message: 'Error occurred while fetching user information',
                    });
                } else {
                    const user = results[0];
                    if (user) {
                        // 返回用户信息
                        res.send({
                            status: 0,
                            message: 'User information retrieved successfully',
                            user: user,
                        });
                    } else {
                        res.send({
                            status: 1,
                            message: 'User not found',
                        });
                    }
                }
            });
        }
    });
};

module.exports = infoHandler;
