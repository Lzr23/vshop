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

//////获取单个会员
router.get('/getMember', (req, res, next) => {
	let {memberCard} = req.query
	Member.findOne({memberCard}, (err, doc) => {
		if (err) {
			return res.json({
				status: '0',
				msg: '获取失败'
			})
		} else {
			return res.json({
				status: '1',
				result: doc
			})
		}
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
		params = {  //查询时候的过滤参数
			memberCard: {$regex: findContent}
		}
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

///////////新增会员
router.post('/memberAdd', (req, res, next) => {
	let newMember = req.body
	let {memberCard} = req.body
	Member.findOne({memberCard}, (err, doc) => {
		if (doc != null) {
			return res.json({
	          status: '0',
	          msg: '会员已存在'
	        })
		} else {   /////////新增会员
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
		}
	})
})

//////////会员修改
router.post('/memberEdit', (req, res, next) => {
	let newMember = req.body
	let {memberCard} = req.body
	Member.findOne({memberCard}, (err, doc) => {
		if (doc != null) {   /////////修改会员
			doc.memberCard = newMember.memberCard
			doc.memberCell = newMember.memberCell
			doc.memberGrade = newMember.memberGrade
			doc.memberPassword = newMember.memberPassword
			doc.memberBalance = newMember.memberBalance
			doc.memberSex = newMember.memberSex
			doc.memberRemark = newMember.memberRemark
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
				msg: '修改失败'
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

//////会员修改密码
router.post('/changePass', (req, res, next) => {
	let {memberCard, old, newPass} = req.body
	member.findOne({memberCard}, (err, doc) => {
		if (err) {
			return res.json({
		      status: '0',
		      msg: err.message
		    });
		}
		if (doc.memberPassword != old) {
			return res.json({
		      status: '0',
		      msg: '密码有误，请重新输入'
		    });
		}
		doc.memberPassword = newPass
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


//////////////会员冻结
router.post('/loss', (req, res, next) => {
	let {members} = req.body
	members.forEach(item => {
		let memberCard = item.memberCell
		Member.findOne({memberCard}, (err, doc) => {
			doc.memberStatus = 0
			doc.save((err, doc) => {
				if (err) {
					return res.json({
			          status: '0',
			          msg: err.message
			        })
				}
			})
		})
	})
	return res.json({
      status: '1',
      msg: '冻结成功'
    })
})

//////////////会员解冻
router.post('/normal', (req, res, next) => {
	let {members} = req.body
	members.forEach(item => {
		let memberCard = item.memberCell
		Member.findOne({memberCard}, (err, doc) => {
			doc.memberStatus = 1
			doc.save((err, doc) => {
				if (err) {
					return res.json({
			          status: '0',
			          msg: err.message
			        })
				}
			})
		})
	})
	return res.json({
	  status: '1',
	  msg: '解冻成功'
	})
})

module.exports = router;