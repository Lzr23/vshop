<template>
	<div>
		<el-row>
			<el-col :span="8">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-col>
			<el-col :span='12' class="myForm">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
					<el-form-item label="商品分类" prop="goodsClassify">
						<el-select v-model="ruleForm.goodsClassify" placeholder="请选择">
							<el-option-group v-for="group in options3" :key="group.label" :label="group.label">
								<el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-option-group>
						</el-select>
					</el-form-item>
					<el-form-item label="商品编码" prop="goodsNo">
						<el-input v-model="ruleForm.goodsNo"></el-input>
					</el-form-item>
					<el-form-item label="自动生成编码">
						<el-switch v-model="ruleForm.delivery"></el-switch>
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
				imageUrl: '',
				ruleForm: {
					goodsClassify: '',
					goodsNo: '',
					delivery: true,
					goodsName: '',
					goodsIn: '',
					goodsOut: '',
					goodsStock: ''
				},
				rules: {
					goodsClassify: [{
							required: true,
							message: '请选择商品分类',
							trigger: 'blur'
						}
					],
					goodsNo: [{
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
				options3: [{
					label: '热门城市',
					options: [{
						value: 'Shanghai',
						label: '上海'
					}, {
						value: 'Beijing',
						label: '北京'
					}]
				}, {
					label: '城市名',
					options: [{
						value: 'Chengdu',
						label: '成都'
					}, {
						value: 'Shenzhen',
						label: '深圳'
					}, {
						value: 'Guangzhou',
						label: '广州'
					}, {
						value: 'Dalian',
						label: '大连'
					}]
				}]
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
						console.log(valid)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
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