const express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    path = require("path"),
    fs = require('fs'),
    /*打印日志*/
    log = require('./app/logger/logger'),
    logger = require('./app/logger/logger').logger,
    /*引入拦截器*/
    interceptor = require('./app/config/interceptor');
    app = express();
let port = process.env.PORT || 3000;
/*定义一个全局的logger 避免重复引用*/
global.logger=logger;
/*在线监控运行出现的 bug*/
// let fundebug = require("fundebug-nodejs");
// fundebug.apikey="b0af0630b8ef1945ab3824c5b532d7b87311cc6b7c08cbbc28c9240a1caa756f";
/*解决跨域问题，允许的请求方式，header类型*/
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type");
    res.header("Expires","Thu, 28 Mar 2019 06:59:52 GM")
    next();
});
////////////////////// 添加Log4js配置 /////////////////////////////
//结合express使用，记录请求日志
log.use(app,'');
//手动记录，可以代替console.log
logger().info('test info 1');
// app.use('/static',express.static(path.resolve(__dirname, '../../')));
// bodyParser.urlencoded解析form表单提交的数据
app.use(bodyParser.urlencoded({extended: false}));
// bodyParser.json解析json数据格式的
app.use(bodyParser.json());
/*托管静态文件目录*/
app.use('/static',express.static('public'));
/*入口文件 index*/
app.use(function (req, res, next) {
    const url = req.url;
    if (url == '/microManagement/') {
        res.sendFile(path.resolve(__dirname, '../../../templates/angular/microManagementIndex.html'));
    }
    else {
        next();
    }
})
/*对接口进行拦截*/
app.use(interceptor.interceptor);
/*加载路由*/
let indexRoute = require('./app/routes/index');
indexRoute.map(function (item,index) {
    item(app);
})
app.get('/ttt',function(req,res,next){

})
/*处理404错误*/
app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

// app.use(fundebug.ExpressErrorHandler);
// fundebug.notify("Test", "Hello Fundebug!")
app.listen(port);
console.log(`Listening on port ${port}...`);
module.exports= app;