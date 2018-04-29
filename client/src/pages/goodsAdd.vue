<template>
	<div>
		<el-row>
			<el-col :span="8">
				<form action="/goods/upImg" method="post" enctype='multipart/form-data' target="id_iframe">
					<input name='inputFile' type="file" multiple='mutiple'/>
					<input type="submit" @click="upImg" value="上传图片"/>
				</form>
				<iframe id="id_iframe" name="id_iframe" style="display: none;"></iframe>
			</el-col>
			<el-col :span='12' class="myForm">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
					<el-form-item label="商品分类" prop="goodsClassifyC">
						<el-select v-model="ruleForm.goodsClassifyC" placeholder="请选择">
							<el-option-group v-for="classify in classifyP" :key="classify.classifyName" :label="classify.classifyName">
								<el-option v-for="item in classify.classifys" :key="item.classifyName" :label="item.classifyName" :value="item.classifyName">
								</el-option>
							</el-option-group>
						</el-select>
					</el-form-item>
					<el-form-item label="商品编码" prop="goodsId">
						<el-input v-model="ruleForm.goodsId" readonly></el-input>
					</el-form-item>
					<el-form-item label="商品名称" prop='goodsName'>
						<el-input v-model="ruleForm.goodsName"></el-input>
					</el-form-item>
					<el-form-item label="商品进价" prop="goodsIn">
						<el-input v-model="ruleForm.goodsIn" type='number'></el-input>
					</el-form-item>
					<el-form-item label="商品售价" prop="goodsOut">
						<el-input v-model="ruleForm.goodsOut" type='number'></el-input>
					</el-form-item>
					<el-form-item label="商品库存" prop="goodsStock">
						<el-input v-model="ruleForm.goodsStock" type='number'></el-input>
					</el-form-item>
					<el-form-item label="备注" prop="remark">
						<el-input type="textarea" v-model="ruleForm.remark"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">立即新增</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				isEdit: false, //////标记是否为修改
				ruleForm: {
					goodsId: '',
					goodsImg: '',
					goodsName: '',
					goodsClassifyC: '',
					goodsIn: '',
					goodsOut: '',
					goodsStock: '',
					goodsStatus: 1,
					goodsRemark: ''
				},
				rules: {
					goodsClassifyC: [{
							required: true,
							message: '请选择商品分类',
							trigger: 'blur'
						}
					],
					goodsId: [{
						required: true,
						message: '请输入商品编码',
						trigger: 'blur'
					}],
					goodsName: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
					goodsIn: [{
						required: true,
						message: '请输入商品进价',
						trigger: 'blur'
					}],
					goodsOut: [{
						required: true,
						message: '请输入商品售价',
						trigger: 'blur'
					}],
					goodsStock: [{
						required: true,
						message: '请输入商品库存',
						trigger: 'blur'
					}]
				},
				classifyP: []  ////分类列表
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if (this.isEdit) {
							var url = document.getElementById('id_iframe').contentDocument.body.textContent
							url = url.substr('8')
							url = url.substr('0', url.length-2)
							this.ruleForm.goodsImg = '../../static/images/' + url
							this.$http.post('/goods/edit', this.ruleForm)
							.then(res => {
								res = res.data
								this.$message(res.msg)
						   		if (res.status == '1') {
						   			this.$router.push({
						   				path: '/backEnd/goodsList'
						   			})
						   		}
							})
						} else {
							var url = document.getElementById('id_iframe').contentDocument.body.textContent
							url = url.substr('8')
							url = url.substr('0', url.length-2)
							this.ruleForm.goodsImg = '../../static/images/' + url
							this.$http.post('/goods/add', this.ruleForm)
							.then(res => {
								res = res.data
								this.$message(res.msg)
						   		if (res.status == '1') {
						   			this.$router.push({
						   				path: '/backEnd/goodsList'
						   			})
						   		}
							})
						}
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getGoods(goodsId) {
				let params = {
					goodsId
				}
				this.$http.get('/goods/getGoods', {params})
				.then(res => {
					res = res.data
					if (res.status == '1') {
						this.ruleForm = res.result
					} else {
						this.$message(res.msg)
					}
				})
			},
			upImg() {
				this.$message('上传成功')
			},
			getClassify() {
				this.$http.get('/classifys/goodsClassify')
				.then(res => {
					res = res.data
					if (res.status == '1') {
			   			this.classifyP = res.result.list
			   		}
				})
			},
			getGoodsId(){
				let code = Date.parse(new Date()) - parseInt(Math.random()*100)
				this.ruleForm.goodsId = code
			}
		},
		mounted() {
			this.getClassify()
			this.getGoodsId()
			if (this.$route.params.goodsId) {
				this.isEdit = true
				this.getGoods(this.$route.params.goodsId)
			}
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>