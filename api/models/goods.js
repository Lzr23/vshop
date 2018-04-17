let mongoose = require('../db');

let goodsSchema = new mongoose.Schema({
	"goodsId": String, //商品编号
	"goodsName": String, //商品名称
	"goodsClassifyP": String, //商品大分类
	"goodsClassifyC": String, //商品小分类
	"goodsIn": Number, //商品进价
	"goodsOut": Number, //商品售价
	"goodsStock": Number, //商品库存
	"goodsStatus": Number, //商品状态
	"goodsRemark": String //商品备注
});

module.exports = mongoose.model("Good", goodsSchema);