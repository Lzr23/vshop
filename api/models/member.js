let mongoose = require('../db');

let memberSchema = new mongoose.Schema({
	"memberCard": String, //用户卡号
	"memberCell": String, //用户手机
	"memberPassword": String, //用户支付密码
	"memberBalance": Number, //用户余额
	"memberGrade": String, //用户等级
	"memberSex": String, //用户性别
	"memberStatus": Number, //用户状态
	"memberRemark": String //用户备注
});

module.exports = mongoose.model("Member", memberSchema);