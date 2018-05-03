var express = require('express');
var router = express.Router();
//let Member = require('../models/member');
//let Grade = require('../models/grade');
//let Good = require('../models/good');
//let Classify = require('../models/classify');
let Order = require('../models/order');


/////////保存订单
router.post('/save', (req, res, next) => {
	let {member,cartList,orderTotal} = req.body
	let time = new Date()
	let orderId = time.getTime()
	let orderDate = time.toLocaleDateString()
	let orderCount = 0
	cartList.forEach(item => {
		orderCount += item.goodsNum
	})
	
	if (!member.memberCard) {
		member.memberCell = "散客"
	}
	let newOrder = {
		orderId,
		orderDate,
		orderCount,
		orderTotal,
		member,
		cartList
	}
	Order.create(newOrder, (err) => {
		if (err) {
			return res.json({
				status: '0',
				msg: '支付失败'
			})
		} else {
			return res.json({
				status: '1',
				msg: '支付成功'
			})
		}
	})
	
})

////////////获取所有订单
router.get('/all', (req, res, next) => {
	Order.find({})
		.exec((err, doc) => {
			if(err) {
				return res.json({
					status: '0',
					msg: err.message
				})
			}
			return res.json({
				status: '1',
				msg: '',
				result: {
					count: doc.length,
					list: doc
				}
			})
		})
})

////////////订单列表
router.get('/list', (req, res, next) => {
	let page = parseInt(req.query["page"]); //获取当前页码
	let pageSize = parseInt(req.query["pageSize"]); //获取页的大小
	let skip = (page - 1) * pageSize; //计算需要跳过多少条

//查找商品，跳过skip条，限制一页查pageSize条
	Order.find({})
		.skip(skip)
		.limit(pageSize)
		.exec((err, doc) => {
			if(err) {
				return res.json({
					status: '0',
					msg: err.message
				});
			}
			return res.json({
				status: '1',
				msg: '',
				result: {
					count: doc.length,
					list: doc
				}
			});
		})
})
module.exports = router;
