const db = require('../../db');
const jwt = require("jsonwebtoken");
const config = require("../../config");

const addCommodityInfoHandler = (req, res) => {
  const {id, name, type, price, date, description} = req.body;
  const module3Token = req.cookies['module3_token'];
  if (!module3Token) {
    res.send({
      status: 1,
      message: 'Token not found',
    });
  } else {
    const decoded = jwt.verify(module3Token, config.jwtSecretKeyM3);
    const user_id = decoded.user_id;
    var is_businessmen;
    const q = `SELECT is_businessmen FROM module3_users WHERE user_id = ?`;
    db.query(q, [user_id], (err, results) => {
      if (err) {
        res.status(500).json({status: 1, message: 'Internal Server Error'});
      }

      if (results.length === 0) {
        res.status(404).json({status: 1, message: 'User not found'});
      }
      is_businessmen = results[0].is_businessmen;
      if (is_businessmen !== 1) {
        res.status(400).json({status: 1, message: 'Not businessmen'});
      } else {
        const queryStr = 'INSERT INTO module3_commodity SET ?';
        const value = {
          businessmen_id: id,
          name,
          type,
          price: parseInt(price),
          commodity_time: date,
          info: description
        };
        db.query(queryStr, value, (err, result) => {
          if (err) {
            console.error('Error adding commodity information:', err);
            return res.status(500).json({status: 1, message: 'Failed to add commodity information'});
          }

          res.send({status: 0, message: 'Successfully add'});
        });
      }
    })
  }
};

module.exports = {
  addCommodityInfoHandler,
};