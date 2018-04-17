let mongoose = require('../db');

let classifySchema = new mongoose.Schema({
	"classifyId": String, //分类编号
	"classifyName": String, //分类名称
	"classifyParent": String //父级分类
});

module.exports = mongoose.model("Classify", classifySchema);