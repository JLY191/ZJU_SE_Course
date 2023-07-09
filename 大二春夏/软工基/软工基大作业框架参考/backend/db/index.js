const mysql = require('mysql2')

// 创建数据库连接对象
const db = mysql.createPool({
  host: 'localhost', // 数据库的 IP 地址
  user: 'user', // 登录数据库的账号
  password: '123456', // 登录数据库的密码
  database: 'fse', // 指定操作的数据库
});

// 向外共享 db 数据库连接对象
module.exports = db;