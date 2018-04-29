var express = require('express');
var router = express.Router();
let Good = require('../models/good');
let Classify = require('../models/classify')
var multiparty = require('multiparty');
var fs = require('fs');

////////图片上传
router.post('/upImg', (req, res, next) => {
	var form = new multiparty.Form({
		uploadDir: './../client/static/images/'
	})

	form.parse(req, function(err, fields, files) {
		var filesTmp = JSON.stringify(files, null, 2);

		if(err) {
			console.log('parse error: ' + err);
		} else {
			console.log('parse files: ' + filesTmp);
			var inputFile = files.inputFile[0];
			var uploadedPath = inputFile.path;
			var dstPath = './../client/static/images/' + inputFile.originalFilename.toLowerCase();
			//重命名为真实文件名
			fs.rename(uploadedPath, dstPath, function(err) {
				if(err) {
					console.log('rename error: ' + err);
				} else {
					return res.json({
						msg: inputFile.originalFilename.toLowerCase()
					})
				}
			})
		}
	})
})

//////////商品新增
router.post('/add', (req, res, next) => {
	let newGood = req.body
	Classify.findOne({'classifyName': newGood.goodsClassifyC}, (err,doc) => {
		if (err) {
			return res.json({
				status: '0',
				msg: '新增失败'
			})
		} else {
			newGood.goodsClassifyP = doc.classifyP
			Good.create(newGo od, (err) => {
				if (err) {
					return res.json({
						status: '0',
						msg: '新增失败'
					})
				} else {
					return res.json({
						status: '1',
						msg: '新增商品成功'
					})
				}
			})
		}
	})
	
})


////////查询所有商品
router.get('/all', (req, res, next) => {
	Good.find({})
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

//////获取单个商品
router.get('/getGoods', (req, res, next) => {
	let {goodsId} = req.query
	Good.findOne({goodsId}, (err, doc) => {
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

//////根据条件查询商品
router.get('/list', (req, res, next) => {
	console.log(req.originalUrl)
	let page = parseInt(req.query["page"]); //获取当前页码
	let pageSize = parseInt(req.query["pageSize"]); //获取页的大小
	let skip = (page - 1) * pageSize; //计算需要跳过多少条
	let findContent = req.query['findContent']
	let params
	if (findContent) {
		params = {  //查询时候的过滤参数
			goodsId: {$regex: findContent}
		}
	} else {
		params = {}
	}
	//查找商品，跳过skip条，限制一页查pageSize条
	Good.find(params)
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


//////////商品修改
router.post('/edit', (req, res, next) => {
	let newGoods = req.body
	let {goodsId} = req.body
	Good.findOne({goodsId}, (err, doc) => {
		if (doc != null) {   /////////修改商品
			doc.goodsImg = newGoods.goodsImg
			if (newGoods.goodsImg != '' && newGoods.goodsImg != null) {
				doc.goodsImg = newGoods.goodsImg
			}
			doc.goodsName = newGoods.goodsName
			doc.goodsClassifyP = newGoods.goodsClassifyP
			doc.goodsClassifyC = newGoods.goodsClassifyC
			doc.goodsIn = newGoods.goodsIn
			doc.goodsOut = newGoods.goodsOut
			doc.goodsRemark = newGoods.goodsRemark
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

//////////////商品下架
router.post('/down', (req, res, next) => {
	let {goods} = req.body
	goods.forEach(item => {
		let goodsId = item.goodsId
		Good.findOne({goodsId}, (err, doc) => {
			doc.goodsStatus = 0
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
      msg: '商品已下架'
    })
})

//////////////商品上架
router.post('/up', (req, res, next) => {
	let {goods} = req.body
	goods.forEach(item => {
		let goodsId = item.goodsId
		Good.findOne({goodsId}, (err, doc) => {
			doc.goodsStatus = 1
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
	  msg: '商品已上架'
	})
})

module.exports = router;