const jwt = require('jsonwebtoken');
const db = require('../../db');
const config = require('../../config');

const searchHandler = (req, res) => {
    const { maxPrice, startTime, endTime, commodity_name, rank, type } = req.body;

    // 验证 token
    const module3Token = req.cookies['module3_token'];
    if (!module3Token) {
        res.send({
            status: 1,
            message: 'Token not found',
        });
        return;
    }

    try {
        const decoded = jwt.verify(module3Token, config.jwtSecretKeyM3);
        const user_id = decoded.user_id;

        // 构造查询条件
        let conditions = 'price <= ? AND commodity_time >= ? AND commodity_time <= ?';
        const params = [maxPrice, startTime, endTime];
        if (commodity_name) {
            conditions += ' AND name = ?';
            params.push(commodity_name);
        }
        if (type !== undefined) {
            conditions += ' AND type = ?';
            params.push(type);
        }
        // 查询满足条件的商品
        const sql = 'SELECT commodity_id as id, businessmen_id, type, name, price, commodity_time, info FROM module3_commodity WHERE ' + conditions;
        db.query(sql, params, (err, results) => {
            if (err) {
                return res.cc(err);
            }
            if (rank === 'asc') {
                results.sort((a, b) => a.price - b.price);
            } else if (rank === 'desc') {
                results.sort((a, b) => b.price - a.price);
            }

            res.send({
                status: 0,
                message: 'Search results',
                data: results,
            });
        });
    } catch (error) {
        return res.status(401).json({
            status: 1,
            message: 'Unauthorized',
        });
    }
};

module.exports = searchHandler;
