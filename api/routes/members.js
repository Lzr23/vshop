var express = require('express');
var router = express.Router();
let Member = require('../models/member');


////////查询所有会员
router.get('/all', (req, res, next) => {
	Member.find({})
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
//////根据条件查询会员
router.get('/list', (req, res, next) => {
	console.log(req.originalUrl)
	let page = parseInt(req.query["page"]); //获取当前页码
	let pageSize = parseInt(req.query["pageSize"]); //获取页的大小
	let skip = (page - 1) * pageSize; //计算需要跳过多少条
	let findContent = req.query['findContent']
	let params
	if (findContent) {
		params = {findContent}; //查询时候的过滤参数
	} else {
		params = {}
	}
	//查找会员，跳过skip条，限制一页查pageSize条
	Member.find(params)
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

/////////新增会员
router.post('/memberAdd', (req, res, next) => {
	let newMember = req.body
	Member.create(newMember, (err) => {
		if (err) {
			return res.json({
				status: '0',
				msg: '新增失败'
			})
		} else {
			return res.json({
				status: '1',
				msg: '新增会员成功'
			})
		}
	})
})

////////会员充值
router.post('/recharge', (req, res, next) => {
	let {memberCard, amount} = req.body
	Member.findOne({memberCard}, (err, doc) => {
		if (err) {
			return res.json({
		      status: '0',
		      msg: err.message
		    });
		}
		if (amount == '') {
			return res.json({
		      status: '0',
		      msg: '充值失败'
		    });
		}
		doc.memberBalance += parseInt(amount)
		
		doc.save((err, doc1) => {
			if (err) {
				return res.json({
		          status: '0',
		          msg: err.message
		        })
			}
			return res.json({
	          status: '1',
	          msg: '充值成功'
	        })
		})
	})
})


module.exports = router;