const db = require('../../../db');

// 用户注册处理程序
const registerHandler = (req, res) => {
    // 从请求体中获取用户注册信息
    const { user_name, pwd, is_VIP, is_businessmen, IC,  Real_Name, work_for, bank } = req.body;
 
    // 在连接池中获取一个连接
    db.getConnection((error, connection) => {
        if (error) {
            // 处理连接错误
            return res.cc('Database connection failed');
        }

        // 检查用户名是否已经存在
        connection.query(
            'SELECT COUNT(*) as count FROM module3_users WHERE user_name = ?',
            [user_name],
            (error, results) => {
                if (error) {
                    // 处理数据库错误
                    connection.release();
                    return res.cc('User registration failed');
                }

                // 用户名已存在，注册失败
                if (results[0].count > 0) {
                    connection.release();
                    return res.cc('Username already exists');
                }

                // 执行插入用户数据的操作
                connection.query(
                    'INSERT INTO module3_users (user_name, pwd, is_VIP, is_businessmen, work_for, Real_Name, IC) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [user_name, pwd, is_VIP, is_businessmen, work_for, Real_Name, IC],
                    (error, results) => {
                        // 释放连接回连接池
                        connection.release();

                        if (error) {
                            // 处理数据库错误
                            return res.cc('User registration failed');
                        }
                        
                        // 向表 bank 中插入数据
                        const queryStr1 = "INSERT INTO bank (Card_No, Password, Balance) VALUES (?, ?, ?)";
                        db.query(queryStr1, [bank, pwd, 0], (err, result) => {
                            if (err) {
                                return res.cc('User registration failed');
                            }
                        });

                        // 向表 module1_userinfo 中插入数据
                        const queryStr2 = "INSERT INTO module1_userinfo (user_id, user_name, bank_id) VALUES (?, ?, ?)";
                        db.query(queryStr2, [results.insertId, user_name, bank], (err, result) => {
                            if (err) {
                                return res.cc('User registration failed');
                            }
                        });

                        res.send({
                            status: 0,
                            message: 'User registration successful',
                        });
                    }
                );
            }
        );
    });
};

module.exports = registerHandler;
