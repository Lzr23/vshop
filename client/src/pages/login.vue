<template>
	<div class="loginContainer">
		<div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="登录名" prop="name">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type='password' v-model="ruleForm.password"></el-input>
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
							userName: this.ruleForm.name,
							userPwd: this.ruleForm.password
						}).then(response => {
							let res = response.data
							if (res.status == '1') {
								this.$router.push({
						          path: '/home'
						        })
							} else {
								this.$message(res.message);
							}
						})
					} else {
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