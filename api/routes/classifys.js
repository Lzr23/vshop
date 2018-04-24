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
	Classify.find({})
		.skip(skip)
		.limit(pageSize)
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
					list: doc
				}
			})
		})
})

////////获取顶级菜单
router.get('/parent', (req, res, next) => {
	Classify.find({"classifyP": "顶级菜单"})
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
				list: doc
			}
		})
	})
})

//////////新增分类
router.post('/add', (req, res, next) => {
	let newClassify = req.body
	let {classifyName} = req.body
	Classify.findOne({classifyName}, (err, doc) => {
		if (doc != null) {
			return res.json({
	          status: '0',
	          msg: '分类已存在'
	        })
		} else {   /////////新增分类
			Classify.create(newClassify, (err) => {
				if (err) {
					return res.json({
						status: '0',
						msg: '新增失败'
					})
				} else {
					return res.json({
						status: '1',
						msg: '新增分类成功'
					})
				}
			})
		}
	})
})

/////修改分类
router.post('/edit', (req, res, next) => {
	let newClassify = req.body.newClassify
	let {classifyName} = req.body.old
	Classify.findOne({classifyName}, (err, doc) => {
		doc.classifyName = newClassify.classifyName
		doc.classifyP = newClassify.classifyP
		doc.save((err, doc1) => {
			if (err) {
				return res.json({
		          status: '0',
		          msg: err.message
		        })
			}
			return res.json({
	          status: '1',
	          msg: '修改成功'
	        })
		})
	})
})

//////分类删除
router.post('/delete', (req, res, next) => {
	let {classifys} = req.body
	classifys.forEach(item => {
		if (item.classifyP == '顶级菜单') {
			Classify.remove({"classifyP": item.classifyName}, (err, doc) => {
				if (err) console.log(err)
			})
			
		}
		Classify.remove({"classifyName": item.classifyName}, (err, doc) => {
			if (err) console.log(err)
		})
	})
	return res.json({
		status: '1',
		msg: '删除成功'
	})
})


///////////商品新增获取分类列表
router.get('/goodsClassify', (req, res, next) => {
	let classifys = []
	Classify.find({"classifyP": "顶级菜单"})
	.exec((err, doc) => {
		var counter = 0
		doc.forEach(item => {
			let classify = {
				"classifyName": item.classifyName
			}
			Classify.find({"classifyP": item.classifyName})
			.exec((err, doc1) => {
				classify.classifys = doc1
				classifys.push(classify)
				counter ++
				if (counter == doc.length) {
					return res.json({
						status: '1',
						result: {
							list: classifys
						}
					})
				}
			})
		})
	})
})
module.exports = router;
