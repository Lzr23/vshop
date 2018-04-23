var express = require('express');
var router = express.Router();
let Classify = require('../models/classify');

//////获取分类总数
router.get('/all', (req, res, next) => {
	Classify.find({})
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

////////获取分类列表
router.get('/list', (req, res, next) => {
	let page = parseInt(req.query["page"]); //获取当前页码
	let pageSize = parseInt(req.query["pageSize"]); //获取页的大小
	let skip = (page - 1) * pageSize; //计算需要跳过多少条
	//查找会员，跳过skip条，限制一页查pageSize条
	Member.find({})
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
					list: doc
				}
			});
		})
})

////////

module.exports = router;
