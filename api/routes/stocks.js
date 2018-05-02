var express = require('express');
var router = express.Router();
let Stock = require('../models/stock');
let Good = require('../models/good');

//////////商品进货
router.post('/goodsIn', (req, res, next) => {
	let {goodsList} = req.body
	let time = new Date()
	let stockId = time.getTime()
	let stockDate = time.toLocaleDateString()
	let stockQuantity = 0
	let stockTotal = 0
	
	goodsList.forEach(item => {
		item.total = item.goodsIn * item.quantity
		console.log(typeof item.quantity)
		stockQuantity += parseInt(item.quantity)
		stockTotal += item.total
	})
	
	let newStock = {
		stockId,
		goodsList,
		stockQuantity,
		stockTotal,
		stockDate
	}
	console.log(newStock)
	Stock.create(newStock, (err) => {
		if (err) {
			return res.json({
				status: '0',
				msg: '进货失败'
			})
		} else {
			let flag = 0
			goodsList.forEach(item => {
				Good.findOne({"goodsId": item.goodsId}, (err, doc) => {
					if (doc != null) {
						doc.goodsStock += parseInt(item.quantity)
						doc.save((err, doc1) => {
							if (err) {
								return res.json({
						          status: '0',
						          msg: err.message
						        })
							}
							flag ++
							if (flag == goodsList.length) {
								return res.json({
									status: '1',
									msg: '进货成功'
								})
							}
						})
					}
				})
			})
		}
	})
})

////////查询所有进货
router.get('/all', (req, res, next) => {
	Stock.find({})
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

////////////库存列表
router.get('/list', (req, res, next) => {
	let page = parseInt(req.query["page"]); //获取当前页码
	let pageSize = parseInt(req.query["pageSize"]); //获取页的大小
	let skip = (page - 1) * pageSize; //计算需要跳过多少条
	let findContent = req.query['findContent']
	let params
	if (findContent) {
		params = {  //查询时候的过滤参数
			
		}
	} else {
		params = {}
	}
	//查找商品，跳过skip条，限制一页查pageSize条
	Stock.find(params)
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
