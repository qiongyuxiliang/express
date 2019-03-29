/*导入所需要的数据库*/
const express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    conn = require('./sqlConn/mysqlConn'),
    sqlSentence = require('../models/taskModel'),
    /*从mongoDB里查询数据*/
    bannerList = require('./mongooseModel/bannerList.js'),
    // logger = require('../logger/logger').logger('taskRepository'),
    async = require('async'),
    redis = require('./redis/redisConn');
let task = sqlSentence.taskList,
    paraTest = sqlSentence.paraTest,
    exposeCon = conn.exposeCon,
    normalCon = conn.normalCon,
    transactionPacked = conn.transactionPacked,
    rollBackTest = sqlSentence.rollBackTest;

/*task 的业务逻辑*/
class TaskListRepository {

    constructor() {
        /*自身的属性*/
    }
    /*根据restful API的规则，分别定义对应的几种接口类型*/
    listAllTasks(req, res) {
        logger().info('test info 222222222');
        //实现查看所有Tasks的方法,不含参数
        exposeCon().then(function (conn) {
            conn.query(task(), function (err, row) {
                if (err) {
                    if (err) {
                        res.json({
                            errorInfo: '0x00002',
                        })
                    }
                } else {
                    console.log('22')
                    res.json({
                        data: row,
                    })
                    conn.release();
                }
            })
        })
    }

    findTaskBy(id) {
        //实现通过id查看具体Task的方法
    }

    createTask(TaskBody) {
        //实现创建新Task纪录的方法
    }

    updateTask(id, update) {
        //实现通过id和一个更新对象来更新Task纪录的方法
    }

    deleteTaskBy(id) {

        // router.get('/redistest3', (async(req, res, next)=> {
        //     let r =  await redis.client.mutli().hgetall('myname').execAsync();
        //     res.json(r);
        // }));

    }
    /*rollBack 回滚测试*/
    rollBackTest(req, res) {
        let method = true;
        /*此处采用封装好的事务方法进行调取*/
        if(method){
            let sqlArr = ["insert into table1 (name) values('zhang')","insert into table1 (name) values('zhen')","insert into table1 (name) values('chuan')"]
            transactionPacked(sqlArr).then(function (data) {
                res.json({
                    data:data
                })
            });
        }else{
            /*此处是把连接 connection 暴露出来，进行具体的实现*/
            exposeCon().then(function (connection) {
                connection.beginTransaction(function (err) {
                    if (err) {
                        return;
                    }
                    let task1 = function (callback) {
                        connection.query(`insert into table1 (name) values('a')`, function (err, result) {
                            if (err) {
                                callback(err, null);
                                return;
                            }
                            console.log('第一次插入成功!');
                            callback(null, result);
                        })
                    }
                    let task2 = function (callback) {
                        connection.query(`insert into table1 (name) values('kkk')`, function (err, result) {
                            if (err) {
                                callback(err, null);
                                return;
                            }
                            console.log('第二次插入成功!');
                            callback(null, result);
                        })
                    }
                    let task3 = function (callback) {
                        connection.query(`insert into table1 (name) values('laoshu')`, function (err, result) {
                            if (err) {
                                callback(err, null);
                                return;
                            }
                            console.log('第三次插入成功!');
                            callback(null, result);
                        })
                    }
                    async.series([task1, task2, task3], function (err, result) {
                        if (err) {
                            //回滚
                            connection.rollback(function () {
                                console.log('出现错误,回滚!');
                                //释放资源
                                connection.release();
                            });
                            return;
                        } else {
                            //提交
                            connection.commit(function (err) {
                                if (err) {
                                    connection.rollback(function () {
                                        console.log('出现错误,回滚!');
                                        //释放资源
                                        connection.release();
                                    });
                                    return;
                                }
                                console.log('成功,提交!');
                                //释放资源
                                connection.release();
                            });
                        }
                    })
                });
            });
        }
    }

    /*带参数测试*/
    paraTest(req, res, mobile) {
        logger('err').info('携带参数的测试');
        normalCon(paraTest(req.body.mobile),function(err,row,fields){
            if (err) {
                if (err) {
                    res.json({
                        errorInfo: '0x00002',
                    })
                }
            } else {
                logger('oth').error('携带参数的测试');
                res.json({
                    data: row
                })
            }
        })
        // exposeCon().then(function (conn) {
        //     conn.query(paraTest(mobile), function (err, row) {
        //         if (err) {
        //             if (err) {
        //                 res.json({
        //                     errorInfo: '0x00002',
        //                 })
        //             }
        //         } else {
        //             conn.release();
        //             res.json({
        //                 data: row
        //             })
        //         }
        //     })
        // })
    }

    redisTest() {
        /*返回Promise对象*/
        redis.client.multi().get('name').execAsync().then(function (data) {
            res.json({
                data: data,
            })
        })
    }

    mongoTest() {
        bannerList.find({place: 'home', status: '1'}).sort({bannerRank: 'asc'}).exec(function (err, doc) {
            if (err) {
                res.json({
                    errorInfo: '0x00002'
                })
            } else {
                res.json({
                    data: doc
                })
            }
        })
    }
}

module.exports = new TaskListRepository();
