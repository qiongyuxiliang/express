/**
 * 用户信息
 */
var mongoose = require('./db.js'),
    Schema = mongoose.Schema;
var offlineProduct = new Schema({
    productId: {type: String},//产品id
    tag: {type: Array}, //是否包邮
    listPic: {type: Array},//list图片地址
    services: {type: Array},//发货以及营业
    spec: {type: Array},//样式
    detailPic: {type: Array},//详情图
    senderAddress: {type: String},//发货地址
    productSalesVolume: {type: String},//高的售价
    productMarketPrice: {type: String},//市场价
    productAmount: {type: Number},//产品的数量
}, {collection: "offlineProduct"});
/*指定数据文档*/


module.exports = mongoose.model('offlineProduct', offlineProduct);
   