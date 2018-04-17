var express = require('express');
var router = express.Router();
let Members = require('../models/member');

router.get('/list', (req, res, next) => {
	console.log(req.originalUrl)
	let page = parseInt(req.param("page", 1)); //获取当前页码
	let pageSize = parseInt(req.param("pageSize", 10)); //获取页的大小
	let skip = (page - 1) * pageSize; //计算需要跳过多少条
	let findContent = req.param('findContent')
	let params = {findContent}; //查询时候的过滤参数

	//查找会员，跳过skip条，限制一页查pageSize条
	Members.find(params)
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