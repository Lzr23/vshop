let mongoose = require('../db');

let stockSchema = new mongoose.Schema({
	"stockId": String, //进货单号
	"goodsList": [{  //商品列表
		goodsId: String,
		goodsName: String,
		goodsIn: String,
		quantity: Number,
		total: Number
	}],
	"stockQuantity": Number,  ////进货总数
	"stockTotal": Number,   ////进货总计
	"stockDate": String   ////进货时间
});

module.exports = mongoose.model("Stock", stockSchema);