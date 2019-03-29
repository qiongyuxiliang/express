/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var bannerList = new Schema({
    bannerId: {type: String},
    uri: {type: String}, //图片地址
    forward: {type: String},//跳转地址
    place: {type: String},//地方
    bannerType: {type: String},//类别
    status: {type: String},//状态
    bannerRank: {type: Number},//banner级别
    createDate: {type: String},//创建时间

}, {collection: "bannerList"});
/*指定数据文档*/

module.exports = mongoose.model('bannerList', bannerList);
