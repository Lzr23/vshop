var express = require('express');
var router = express.Router();
let Grade = require('../models/grade');

////////获取等级列表
router.get('/list', (req, res, next) => {
	Grade.find({})
	.exec((err, doc) => {
		if(err) {
			return res.json({
				status: '0',
				msg: err.message
			});
		}
		return res.json({
			status: '1',
			result: {
				count: doc.length,
				list: doc
			}
		});
	})
})

/////////等级新增
router.post('/gradeAdd', (req, res, next) => {
	let newGrade = req.body
	let {gradeName} = req.body
	console.log(newGrade)
	Grade.findOne({gradeName}, (err, doc) => {
		if (doc != null) {
			return res.json({
	          status: '0',
	          msg: '等级已存在'
	        })
		} else {   /////////新增会员
			Grade.create(newGrade, (err) => {
				if (err) {
					return res.json({
						status: '0',
						msg: '新增失败'
					})
				} else {
					return res.json({
						status: '1',
						msg: '新增等级成功'
					})
				}
			})
		}
	})
})

////////等级修改
router.post('/gradeEdit', (req, res, next) => {
	let newGrade = req.body
	let {gradeName} = req.body
	Grade.findOne({gradeName}, (err, doc) => {
		if (doc != null) {   /////////修改会员
			doc.gradeName = newGrade.gradeName
			doc.gradeDiscount = newGrade.gradeDiscount
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
		} else {
			return res.json({
				status: '0',
				msg: '等级名称不可修改'
			})
		}
	})
})

//////等级删除
router.post('/gradeDelete', (req, res, next) => {
	let {grades} = req.body
	grades.forEach(item => {
		let gradeName = item.gradeName
		Grade.remove({gradeName}, (err, doc) => {
			if (err) console.log(err)
		})
	})
	return res.json({
		status: '1',
		msg: '删除成功'
	})
})

module.exports = router;
