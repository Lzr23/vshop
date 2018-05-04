var express = require('express');
var router = express.Router();
let Member = require('../models/member');
//let Grade = require('../models/grade');
let Good = require('../models/good');
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
	let newOrder = {
		orderId,
		orderDate,
		orderCount,
		orderTotal,
		member,
		cartList
	}
	
	if (!member.memberCard) {  //////散客订单
		member.memberCell = "散客"
		let flag = 0
				cartList.forEach(item => {   /////////更改商品库存
					Good.findOne({goodsId: item.goodsId}, (err, doc2) => {
						doc2.goodsStock -= item.goodsNum
						doc2.save((err, doc3) => {
							flag ++
							console.log(flag)
							if (flag == cartList.length) {
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
							}
						})
					})
				})
	} else {  //////会员订单
		Member.findOne({memberCard: member.memberCard}, (err, doc) => { ////更改会员余额
		doc.memberBalance -= orderTotal
		doc.save((err, doc1) => {
			if (err) {
				return res.json({
		          status: '0',
		          msg: err.message
		        })
			}
			let flag = 0
			cartList.forEach(item => {   /////////更改商品库存
				Good.findOne({goodsId: item.goodsId}, (err, doc2) => {
					doc2.goodsStock -= item.goodsNum
					doc2.save((err, doc3) => {
						flag ++
						console.log(flag)
						if (flag == cartList.length) {
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
						}
					})
				})
			})
		})
	})
	}
	
	
	
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
