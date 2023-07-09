const express = require('express')
const cors = require('cors')
const joi = require('@hapi/joi')
//引入路由
const m3RegisterRouter = require('./router/module3/user/register');
const m3LoginRouter = require('./router/module3/user/login');
const m3LogoutRouter = require('./router/module3/user/logout');
const m3InfoRouter = require('./router/module3/user/info');
const m3OrderRouter = require('./router/module3/user/order');
const m3OrderRoute = require('./router/module3/order');
const m3SearchRouter = require('./router/module3/search');
const m3RemarkRouter = require('./router/module3/remark');
const m3DisplayRouter = require('./router/module3/display');
const m3ModifyRouter = require('./router/module3/modify');
const m3AdminDisplay = require('./router/module3/admin');
const m3DeleteRouter = require('./router/module3/delete');
const m3AddRouter = require('./router/module3/add');

//cookie解析
const cookieParser = require('cookie-parser');

const app = express(); // 实例化 express 对象
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
 // 配置跨域中间件
app.use(express.json()); // 允许接受 json 数据格式文件
app.use(express.urlencoded({ extended: false })); // 解析 application/x-www-form-urlencoded 格式的表单数据
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// 在路由之前给 res 绑定错误处理函数
app.use((req, res, next) => {
  // status 默认为 1，表示失败情况
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
//所有路由
app.use('/m3/user', m3RegisterRouter);
app.use('/m3/user', m3LoginRouter);
app.use('/m3/user', m3LogoutRouter);
//下面的都要挂cookie，所以解析
app.use(cookieParser())
app.use('/m3/user', m3InfoRouter);
app.use('/m3/user', m3OrderRouter);
app.use('/m3',m3OrderRoute);
app.use('/m3',m3SearchRouter);
app.use('/m3',m3RemarkRouter);
app.use('/m3',m3DisplayRouter);
app.use('/m3',m3ModifyRouter);
app.use('/m3',m3AdminDisplay);
app.use('/m3',m3DeleteRouter);
app.use('/m3',m3AddRouter);
const accountingRouter = require('./router/accounting')
app.use('/m3/accounting', accountingRouter)
// 导入并使用审核模块
const auditRouter = require('./router/audit')
app.use('/m3/audit', auditRouter)
// 导入并使用登录模块
const loginRouter = require('./router/login')
app.use('/m3/auditlogin', loginRouter);
const m2Router = require('./router/module2/router')
app.use('/m2',m2Router);
const m1Router = require('./router/module1/route')
app.use('/m1',m1Router);

const m5Router1 = require('./router/module5/user')
app.use('/api',m5Router1);
const m5Router2 = require('./router/module5/verify')
app.use('/api',m5Router2);

// 注册全局错误中间件捕获错误
app.use((err, req, res, next) => {
  if(err instanceof joi.ValidationError) return res.cc(err)
  if(err.name === 'UnauthorizedError') return res.cc('HTTP方法错误或设置错误！', 500) // 处理 Token 验证失败错误
  res.cc(err)
})


/* 在 8080 端口开启服务器 */
app.listen(8080, () => {
  console.log("server running at http://127.0.0.1:8080");
});
