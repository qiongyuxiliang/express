let interceptorApi = require('./interceptorApi');

function examinToken(token) {
    /*return false 或者 return true*/
}

function examinCookie(cookie) {

}

exports.interceptor = function (req, res, next) {
    let url = req.originalUrl;
    /*示例，假如header携带的是token的认证信息，则获取token进行验证，cookie同理*/
    let token = req.get('token');
    let values = Object.values(interceptorApi);
    if (values.includes(url)) {
        if (token && examinToken(token)) {
            next();
        } else {
            res.json({
                /*告知前端路由进行重定向*/
                redirectCode: 1
            })
        }
    } else {
        next();
    }
}
