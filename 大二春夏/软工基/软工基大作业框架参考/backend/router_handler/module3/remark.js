const jwt = require('jsonwebtoken');
const db = require('../../db');
const config = require('../../config');

const remarkHandler = (req, res) => {
    const { commodityName, score, remark } = req.body;

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

    // Get user_name from module3_user table
    const getUserQuery = 'SELECT user_name FROM module3_users WHERE user_id = ?';
    db.query(getUserQuery, user_id, (err, userResult) => {
        if (err) {
            res.status(500).json({ status: 1, message: 'Internal Server Error' });
            return;
        }

        if (userResult.length === 0) {
            res.status(404).json({ status: 1, message: 'User not found' });
            return;
        }

        // Get commodity_id from module3_commodity table
        const getCommodityQuery = 'SELECT commodity_id FROM module3_commodity WHERE name = ?';
        db.query(getCommodityQuery, commodityName, (err, commodityResult) => {
            if (err) {
                res.status(500).json({ status: 1, message: 'Internal Server Error' });
                return;
            }

            if (commodityResult.length === 0) {
                res.status(404).json({ status: 1, message: 'Commodity not found' });
                return;
            }

            const commodity_id = commodityResult[0].commodity_id;

            // Insert remark into module3_remarks table
            const insertRemarkQuery =
                'INSERT INTO module3_remarks (user_id, commodity_id, remark_detail, score) VALUES (?, ?, ?, ?)';
            const param = [user_id, commodity_id, remark, score];
            db.query(insertRemarkQuery, param, (err) => {
                if (err) {
                    res.status(500).json({ status: 1, message: 'Internal Server Error' });
                    return;
                }

                res.json({ status: 0, message: 'Remark added successfully' });
            });
        });
    });
};

module.exports = remarkHandler;
