const db = require('../../../db');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

// 用户登录处理程序
const loginHandler = (req, res) => {
    // 从请求体中获取用户名和密码
    const { code, user_name, pwd } = req.body;
    // 在连接池中获取一个连接
    db.getConnection((error, connection) => {
        if (error) {
            // 处理连接错误
            return res.cc('Database connection failed');
        }

        // 查询用户信息
        connection.query(
            'SELECT * FROM module3_users WHERE user_name = ? AND pwd = ?',
            [user_name, pwd],
            (error, results) => {
                // 释放连接回连接池
                connection.release();

                if (error) {
                    // 处理数据库错误
                    return res.cc('User login failed');
                }

                // 用户名或密码错误，登录失败
                if (results.length === 0) {
                    return res.cc('Username or password is incorrect');
                }
                if (results[0].is_blacklist === 1) {
                    return res.cc('黑名单，再见咯');
                }
                if (results[0].is_businessmen+results[0].is_inspector+results[0].is_administrator  !== 0) {
                    if (code === 1) {
                        return res.cc("用户类型不匹配");
                    } else {
                        if (code !== 2 && results[0].is_businessmen === 1) {
                            return res.cc("用户类型不匹配");
                        }
                        if (code !== 3 && results[0].is_inspector === 1) {
                            return res.cc("用户类型不匹配");
                        }
                        if (code !== 4 && results[0].is_administrator === 1) {
                            return res.cc("用户类型不匹配");
                        }
                    }
                }


                // 生成 JWT token
                const token = jwt.sign({ user_id: results[0].user_id, module: 'module3' }, config.jwtSecretKeyM3, { expiresIn: '1h' });

                // 设置 Cookie，将 token 发送给客户端
                res.cookie('module3_token', token, { maxAge: 3600000, httpOnly: true, sameSite: 'None', secure: true });

                res.send({
                    status: 0,
                    message: 'User login successful',
                    user: results[0],
                });
            }
        );
    });
};

module.exports = loginHandler;
