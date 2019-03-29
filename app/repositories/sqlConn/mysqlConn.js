const mysql = require('mysql'),
    async = require('async'),
    Global = require('../../global/global.js');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    // password:,
    connectionLimit: 10,
    database: 'test',
    port: 3306,
})
/*暴露出connection 用于处理事务，需要手动关闭数据库连接*/
function exposeCon() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                console.log("数据库连接获取失败");
            } else {
                resolve(conn);
            }
        });
    });
};
/*事务处理 的封装  自动释放数据库资源 利用sync series 异步执行操作*/

function transactionPacked(sqlArr) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                resolve(err);
                return;
            }
            connection.beginTransaction((err) => {
                if (err) {
                    reject(err)
                }
                let arrFunc=[];
                for (let i = 0, len = sqlArr.length; i < len; i++) {
                    arrFunc.push(function(callback){
                        connection.query(sqlArr[i],function (err,result) {
                            if (err) {
                                callback(err, null);
                                return;
                            }
                            console.log('第'+i+'次插入成功!');
                            callback(null, result);
                        })
                    })
                }
                async.series(arrFunc, function (err, result) {
                    if (err) {
                        connection.rollback(function () {
                            console.log('出现错误,回滚!');
                            //释放资源
                            connection.release();
                        });
                        reject(err);
                    } else {
                        connection.commit(err => {
                            if (err) {
                                connection.rollback(() => {
                                    reject(err);
                                })
                            }
                        })
                        console.log('Transaction complete');
                        resolve('Transaction complete');
                        connection.release();
                    }
                })
            })
        })
    })
}
/*不暴露出connection，自动关闭数据库连接*/
function normalCon(sql, callback) {
    pool.getConnection(function (conn_err, conn) {
        if (conn_err) {
            callback(err, null, null);
        } else {
            conn.query(sql, function (query_err, rows, fields) {
                conn.release();
                callback(query_err, rows, fields);
            });
        }
    });
};
module.exports = {exposeCon,transactionPacked,normalCon};