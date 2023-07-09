// 用户登出处理程序
const logoutHandler = (req, res) => {
    // 检查是否存在 token
    const token = req.cookies && req.cookies.token;

    // 清除 Cookie
    res.clearCookie('module3_token');

    // 如果存在 token，则将其设置为过期状态
    if (token) {
        res.send({
            status: 0,
            message: 'User logout successful',
        });
    } else {
        res.send({
            status: 0,
            message: 'User logout successful',
        });
    }
};

module.exports = logoutHandler;
