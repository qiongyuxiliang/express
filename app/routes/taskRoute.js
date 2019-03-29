/*动态加载路由*/
const todoList = require('../controllers/taskCtrl');
module.exports = function (app) {

    app.route('/tasks')
        .get(todoList.taskCtrl)
    // .post(todoList.createTodo);

    app.route('/todos/:todoId')
        .get(todoList.taskCtrl)
    // .put(todoList.updateTodo)
    // .delete(todoList.deleteTodo);

    app.route('/paraTest')
        .post(todoList.testPara)

    app.route('/redisTest')
        .get(todoList.testRedis)

    app.route('/mongoTest')
        .post(todoList.mongoTest)

    app.route('/rollBackTest')
        .get(todoList.rollBackTest)
};


