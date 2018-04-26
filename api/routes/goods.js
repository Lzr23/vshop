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
			Good.create(newGood, (err) => {
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

module.exports = router;