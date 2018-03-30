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
					<el-form-item label="会员手机号" prop="cell">
						<el-input v-model="ruleForm.cell" type='number'></el-input>
					</el-form-item>
					<el-form-item label="会员卡号" prop="card">
						<el-input v-model="ruleForm.cell"></el-input>
					</el-form-item>
					<el-form-item label="会员等级" prop='grade'>
						<el-select v-model="ruleForm.grade" style='width: 100%;'>
							<el-option label="普通会员" value="grade1"></el-option>
							<el-option label="白银会员" value="grade2"></el-option>
							<el-option label="黄金会员" value="grade3"></el-option>
							<el-option label="钻石会员" value="grade4"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="会员支付密码" prop="password">
						<el-input v-model="ruleForm.password"></el-input>
					</el-form-item>
					<el-form-item label="会员性别" prop="sex">
						<el-radio-group v-model="ruleForm.sex">
							<el-radio label="男"></el-radio>
							<el-radio label="女"></el-radio>
						</el-radio-group>
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
					cell: '',
					card: '',
					grade: '',
					password: '123456',
					sex: '',
					remark: ''
				},
				rules: {
					cell: [{
							required: true,
							message: '请输入会员手机号',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '请输入长度为11位的手机号',
							trigger: 'blur'
						}
					],
					grade: [{
						required: true,
						message: '请选择会员等级',
					}],
					password: [{
						required: true,
						message: '请输入支付密码',
						trigger: 'change'
					}],
					sex: [{
						required: true,
						message: '请至少选择一个会员性别',
						trigger: 'change'
					}]
				}
			};
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