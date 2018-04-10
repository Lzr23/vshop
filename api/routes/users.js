var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', (req, res, next) => {
	let param = {
	    userName:req.body.userName,//获取用户名
	    userPwd:req.body.userPwd//获取密码
	  }
	console.log(param)
	return res.json({
		status: '1'
	})
})
module.exports = router;
