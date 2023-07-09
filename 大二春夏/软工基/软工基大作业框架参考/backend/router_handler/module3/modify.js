const db = require('../../db');
const config = require('../../config');
const jwt = require("jsonwebtoken");

const modifyHandler = (req, res) => {
  const { name, price, date, description, id } = req.body.data;
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

  // 检查用户是否是商家并验证所属商家信息
  const checkIsBusinessmenQuery = 'SELECT is_businessmen, work_for FROM module3_users WHERE user_id = ?';
  db.query(checkIsBusinessmenQuery, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: 0,
        message: 'Internal Server Error',
      });
    }

    const isBusinessmen = results[0].is_businessmen;
    const workFor = results[0].work_for;

    if (!isBusinessmen) {
      return res.status(403).json({
        status: 0,
        message: 'Access Denied. Only businessmen can modify commodities.',
      });
    }
    // 修改商品记录
    const modifyCommodityQuery = 'UPDATE module3_commodity SET name = ?, price = ?, commodity_time = ?, info = ? WHERE commodity_id = ?';
    db.query(modifyCommodityQuery, [name, price, date, description, id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          status: 0,
          message: 'Internal Server Error',
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({
          status: 0,
          message: 'Commodity not found.',
        });
      }

      return res.status(200).json({
        status: 1,
        message: 'Commodity modified successfully.',
      });
    });
  });
};

module.exports = { modifyHandler };
