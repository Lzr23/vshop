let mongoose = require('../db');

let gradeSchema = new mongoose.Schema({
	"gradeName": String, //等级名称
	"gradeDiscount": Number, //等级折扣
});

module.exports = mongoose.model("Grade", gradeSchema);