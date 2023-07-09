const db = require('../../db');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const config = require('../../config');


const placeOrder = (req, res) => {
    const { commodity, time } = req.body;
    const module3Token = req.cookies['module3_token'];

    if (!module3Token) {
        res.send({
            status: 1,
            message: 'Token not found',
        });
        return;
    }

    // 解析 token，获取 user_id
    const decodedToken = jwt.verify(module3Token, config.jwtSecretKeyM3);
    const user_id = decodedToken.user_id;

    // 查询 module3_users 表获取 user_name、is_VIP 和 total_pay
    const sqlGetUserInfo = 'SELECT user_name, is_VIP, total_pay FROM module3_users WHERE user_id = ?';
    db.query(sqlGetUserInfo, user_id, (err, result) => {
        if (err) {
            return res.cc(err);
        }

        const { user_name, is_VIP, total_pay } = result[0];

        // 查询 module3_commodity 表获取 price、commodity_id 和 commodity_time
        const sqlGetCommodityInfo = 'SELECT price, commodity_id, commodity_time FROM module3_commodity WHERE name = ?';
        db.query(sqlGetCommodityInfo, commodity, (err, result) => {
            if (err) {
                return res.cc(err);
            }

            const { price, commodity_id, commodity_time } = result[0];
            const discountedPrice = is_VIP ? price * 0.8 : price;

            // 检查时间是否合法
            if (new Date(time) > new Date(commodity_time)) {
                return res.send({
                    status: 1,
                    message: 'Invalid order time',
                });
            }

            // 更新用户的 total_pay 字段
            const updatedTotalPay = total_pay + discountedPrice;

            // 更新用户表中的 total_pay 和 is_VIP 字段
            const updateUserQuery = 'UPDATE module3_users SET total_pay = ?, is_VIP = ? WHERE user_id = ?';
            const updateUserValues = [updatedTotalPay, updatedTotalPay > 5000, user_id];
            db.query(updateUserQuery, updateUserValues, (err) => {
                if (err) {
                    return res.cc(err);
                }

                // 将订单信息插入 module3_order 表
                const sqlInsertOrder = 'INSERT INTO module3_order (user_id, commodity_id, order_time, price) VALUES (?, ?, ?, ?)';
                db.query(sqlInsertOrder, [user_id, commodity_id, time, discountedPrice], (err) => {
                    if (err) {
                        return res.cc(err);
                    }

                    res.send({status: 0, message: 'Order placed successfully'});
                    // // 向模块二传输订单信息
                    // const data = {
                    //     user_name: user_name,
                    //     commodity: commodity,
                    //     price: discountedPrice,
                    //     time: time,
                    // };

                    // // 发送请求到模块二的 /m2/pay
                    // axios
                    //     .post('http://模块二的IP地址/m2/pay', data)
                    //     .then((response) => {
                    //         res.send({
                    //             status: 0,
                    //             message: 'Order placed successfully',
                    //         });
                    //     })
                    //     .catch((error) => {
                    //         res.send({
                    //             status: 1,
                    //             message: 'Failed to transfer order information to Module 2',
                    //         });
                    //     });
                });
            });
        });
    });
};

module.exports = {
    placeOrder,
};
