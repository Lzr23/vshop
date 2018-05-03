let mongoose = require('../db');

let orderSchema = new mongoose.Schema({
	"orderId": String,  /////订单Id
	"orderDate": String,  ////订单时间
	"orderCount": Number,   ////订单商品计数
	"orderTotal": Number,   ////订单总价
	"member": {
		"memberCard": String, //用户卡号
		"memberCell": String, //用户手机
		"memberPassword": String, //用户支付密码
		"memberBalance": Number, //用户余额
		"memberGrade": String, //用户等级
		"memberSex": String, //用户性别
		"memberStatus": Number, //用户状态
		"memberRemark": String //用户备注
	},
	"cartList": [
		{
			"goodsId": String, //商品编号
			"goodsImg": String, //商品图片
			"goodsName": String, //商品名称
			"goodsClassifyP": String, //商品大分类
			"goodsClassifyC": String, //商品小分类
			"goodsIn": Number, //商品进价
			"goodsOut": Number, //商品售价
			"goodsStock": Number, //商品库存
			"goodsStatus": Number, //商品状态
			"goodsRemark": String, //商品备注,
			"goodsNum": Number  /////购买数量
		}
	]
});

module.exports = mongoose.model("Order", orderSchema);