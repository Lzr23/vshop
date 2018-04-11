<template>
	<div class="loginContainer">
		<div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="登录名" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button style='width: 100%;' type="primary" @click="submitForm('ruleForm')">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				ruleForm: {
					name: '',
					password: '',
				},
				rules: {
					name: [{
						required: true,
						message: '请输入登录名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.$http.post('/users/login', {
							userName: 'aaa',
							userPwd: '123456'
						}).then(response => {
							console.log(response)
						})
												this.$router.push({
										          path: '/home'
										        })
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
<style>
	.loginContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.loginContainer>div {
		width: 60%;
	}
</style>