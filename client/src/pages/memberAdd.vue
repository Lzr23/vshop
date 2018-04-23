<template>
	<div>
		<el-row>
			<!--<el-col :span="8">
				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-col>-->
			<el-col :span='16' class="myForm">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
					<el-form-item label="会员手机号" prop="memberCell">
						<el-input v-model="ruleForm.memberCell" type='number' :disabled='isEdit'></el-input>
					</el-form-item>
					<el-form-item label="会员卡号" prop="memberCard">
						<el-input v-model="ruleForm.memberCell" readonly></el-input>
					</el-form-item>
					<el-form-item label="会员等级" prop='memberGrade'>
						<el-select v-model="ruleForm.memberGrade" style='width: 100%;'>
							<el-option v-for="(grade, index) in gradeList" :key="index" :label="grade.gradeName" :value="grade.gradeName"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="会员支付密码" prop="memberPassword">
						<el-input v-model="ruleForm.memberPassword"></el-input>
					</el-form-item>
					<el-form-item label="初始余额" prop="memberBalance">
						<el-input v-model="ruleForm.memberBalance" type='number'></el-input>
					</el-form-item>
					<el-form-item label="会员性别" prop="memberSex">
						<el-radio-group v-model="ruleForm.memberSex">
							<el-radio label="男"></el-radio>
							<el-radio label="女"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="备注" prop="memberRemark">
						<el-input type="textarea" v-model="ruleForm.memberRemark"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">立即保存</el-button>
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
//				imageUrl: '',
				isEdit: false, //////标记是否为修改
				gradeList: [{
					gradeName:''
				}],
				ruleForm: {
					memberCell: '',
					memberCard: '',
					memberGrade: '',
					memberBalance: 0,
					memberPassword: '123456',
					memberSex: '',
					memberStatus: 1,
					memberRemark: ''
				},
				rules: {
					memberCell: [{
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
					memberGrade: [{
						required: true,
						message: '请选择会员等级',
					}],
					memberBalance: [{
						required: true,
						message: '请输入初始余额',
					}],
					memberPassword: [{
						required: true,
						message: '请输入支付密码',
						trigger: 'change'
					}],
					memberSex: [{
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
						this.ruleForm.memberCard = this.ruleForm.memberCell
						if (this.isEdit) {
							this.$http.post('/members/memberEdit', this.ruleForm)
							.then(res => {
								res = res.data
								if (res.status == '1') {
									this.$message(res.msg)
									this.$router.push({
							          path: '/backEnd/memberList'
							        })
								} else {
									this.$message(res.msg)
								}
							})
						} else {
							this.$http.post('/members/memberAdd', this.ruleForm)
							.then(res => {
								res = res.data
								if (res.status == '1') {
									this.$message(res.msg)
									this.$router.push({
							          path: '/backEnd/memberList'
							        })
								} else {
									this.$message(res.msg)
								}
							})
						}
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getMember(memberCard) {
				let params = {
					memberCard
				}
				this.$http.get('/members/getMember', {params})
				.then(res => {
					res = res.data
					if (res.status == '1') {
						this.ruleForm = res.result
					} else {
						this.$message(res.msg)
					}
				})
			},
			getGrade() {
				this.$http.get('/grades/list')
				.then(res => {
					res = res.data
					if(res.status == '1') {
						this.gradeList = res.result.list
					}
				})
			}
//			handleAvatarSuccess(res, file) {
//				this.imageUrl = URL.createObjectURL(file.raw);
//			},
//			beforeAvatarUpload(file) {
//				const isJPG = file.type === 'image/jpeg';
//				const isLt2M = file.size / 1024 / 1024 < 2;
//
//				if(!isJPG) {
//					this.$message.error('上传头像图片只能是 JPG 格式!');
//				}
//				if(!isLt2M) {
//					this.$message.error('上传头像图片大小不能超过 2MB!');
//				}
//				return isJPG && isLt2M;
//			}
		},
		mounted() {
			if (this.$route.params.memberCard) {
				this.isEdit = true
				this.getMember(this.$route.params.memberCard)
			}
			this.getGrade()
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