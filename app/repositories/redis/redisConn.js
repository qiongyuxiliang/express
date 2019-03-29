const redis = require("redis");
const RedisOptions = require('../../global/global');//redis配置文件
const client = redis.createClient(RedisOptions.redis.redis);
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
/*---------------------------------*/
client.auth(RedisOptions.redis.redisPass,function(){
    console.log('通过认证');
});
client.on('ready',function(res){
    console.log('ready');
});
client.on("error", function (err) {
    console.log("Error " + err);
});
client.on('connect',function(){
    // client.set('author', 'Wilson',redis.print);
    // client.get('author', redis.print);
    console.log('connect');
});
// client.hmset('myname', { name:'msq', truename: 'mashouqun ' }, function(err) {
//     console.log(err)
// });
// client.expire('myname',15);
redis.client = client;
module.exports = redis;
