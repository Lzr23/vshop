var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', (req, res, next) => {
	let param = {
	    userName:req.body.userName,//获取用户名
	    userPwd:req.body.userPwd//获取密码
	  }
	console.log(param)
	////////管理员登录
	if (param.userName == 'admin' && param.userPwd == '123456') {
		//给客户端设置cookie, userId改改，值为用户的ID，cookie的作用域是/,过期时间是12个小时
	    res.cookie("userId", 'admin',{
	      maxAge:1000*60*60*12
	    });
		return res.json({
			status: '1',
			message: '欢迎管理员!!'
		})
	////////店员登录
	} else if (param.userName == '123456' && param.userPwd == '123456') {
		//给客户端设置cookie, userId改改，值为用户的ID，cookie的作用域是/,过期时间是1个小时
	    res.cookie("userId", 'staff',{
	      maxAge:1000*60*60*12
	    });
		return res.json({
			status: '1',
			message: '欢迎登录!!'
		})
	} else {
		return res.json({
			status: '0',
			message: '用户名或密码错误'
		})
	}
})

router.post('/logout', (req, res, next) => {
	//清空cookie的用户ID,设置过期时间为上一毫秒
	res.cookie("userId","",{
	  maxAge:-1
	});
	return res.json({
		status:"1",
		msg:'',
		result:''
	});
})

module.exports = router;
