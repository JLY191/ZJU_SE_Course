const db = require('../../db');
const config = require('../../config');

const getCommodityInfoHandler = (req, res) => {
    const { commodityName } = req.body;

    // 查询商品信息
    const queryCommodityInfo = `
    SELECT commodity_id, type, name, price, commodity_time, info
    FROM module3_commodity 
    WHERE name = ?`;

    db.query(queryCommodityInfo, commodityName, (err, commodityRows) => {
        if (err) {
            console.error('Error retrieving commodity information:', err);
            return res.status(500).json({ status: 1, message: 'Failed to retrieve commodity information' });
        }

        const commodity = commodityRows[0];

        if (!commodity) {
            return res.status(404).json({ status: 1, message: 'Commodity not found' });
        }

        const commodityId = commodity.commodity_id;

        // 查询商品评价信息
        const queryRemarks = `
      SELECT remark_detail, score 
      FROM module3_remarks 
      WHERE commodity_id = ?`;

        db.query(queryRemarks, commodityId, (err, remarkRows) => {
            if (err) {
                console.error('Error retrieving remarks:', err);
                return res.status(500).json({ status: 1, message: 'Failed to retrieve remarks' });
            }

            const remarks = remarkRows.map((row) => ({
                remark_detail: row.remark_detail,
                score: row.score,
            }));

            // 计算评分平均值
            const averageScore = remarks.length > 0 ? remarks.reduce((sum, remark) => sum + remark.score, 0) / remarks.length : 0;

            res.json({ status: 0, message: 'Commodity information retrieved successfully', commodity, remarks, averageScore });
        });
    });
};

module.exports = {
    getCommodityInfoHandler,
};
