
const taskListRepository = require("../repositories/taskRepository"),
    bodyParser = require('body-parser');
exports.taskCtrl = function(req, res) {
    /*业务逻辑*/
    let taskList = taskListRepository.listAllTasks(req,res);
};
exports.testRedis = function(req, res) {
    /*业务逻辑*/
    let taskList = taskListRepository.redisTest();
};
exports.testPara = function (req,res) {
    let taskList = taskListRepository.paraTest(req,res,req.body.mobile);
}
exports.mongoTest = function (req,res) {
    let taskList = taskListRepository.mongoTest();
}
exports.rollBackTest = function (req,res) {
    let rollBacktest = taskListRepository.rollBackTest(req,res);
}
