var express = require('express');
var router = express.Router();
let Member = require('../models/member');
let Grade = require('../models/grade');
let Good = require('../models/good');
let Classify = require('../models/classify');

//////获取单个会员信息
router.get('/getMember', (req, res, next) => {
	let {memberCard} = req.query
	Member.findOne({memberCard}, (err, doc) => {
		if (err) {
			return res.json({
				status: '0',
				msg: '获取失败'
			})
		} else {
			Grade.findOne({"gradeName": doc.memberGrade}, (err, doc1) => {
				if (err) {
					return res.json({
						status: '0',
						msg: '获取失败'
					})
				} else {
					return res.json({
						status: '1',
						result: doc,
						discount: doc1.gradeDiscount
					})
				}
			})
		}
	})
})

///////////查询所有商品分类
router.get('/allClassify', (req, res, next) => {
	Classify.find({})
	.exec((err, doc) => {
		if(err) {
			return res.json({
				status: '0',
				msg: err.message
			})
		}
		let classify = []
		doc.forEach(item => {
			if (item.classifyP == '顶级菜单') {
				let newClassify = {
					"classifyP": item.classifyName,
					'classifyC': []
				}
				classify.push(newClassify)
			} else {
				classify.forEach(item1 => {
					if (item1.classifyP == item.classifyP) {
						item1.classifyC.push({"classifyName": item.classifyName})
					}
				})
				
			}
		})
		return res.json({
			status: '1',
			result: classify
		})
	})
})

////////////根据分类获取商品列表
router.get('/getGoodsByClassify', (req, res, next) => {
	let {classifyName} = req.query
	let params = {  //查询时候的过滤参数
		$or: [{goodsClassifyP: classifyName},
		{goodsClassifyC: classifyName}]
	}
	Good.find(params).exec((err, doc) => {
		if(err) {
			return res.json({
				status: '0',
				msg: err.message
			})
		}
		return res.json({
			status: '1',
			result: doc
		})
	})
})
module.exports = router;
