let mongoose = require('../db');

let classifySchema = new mongoose.Schema({
	"classifyName": String, //分类名称
	"classifyP": String //父级分类
});

module.exports = mongoose.model("Classify", classifySchema);