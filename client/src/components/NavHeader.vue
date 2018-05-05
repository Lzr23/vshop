<template>
	<el-row class='myHead'>
		<el-col :span='6' class='logo'>
			<router-link href="javascript:;" to="/home">
			  <img class="navbar-brand-logo" src="/static/logo.png">
			</router-link>
		</el-col>
		<el-col :span="12"></el-col>
		<el-col :span="6">
			<router-link href="javascript:;" to="/backEnd"><span style="margin: 0 10px;">后台管理</span></router-link>
			<router-link href="javascript:;" to="/checkstand"><span style="margin: 0 10px;">前台收银</span></router-link>
			<router-link href="javascript:;" to="/">退出</router-link>
		</el-col>
	</el-row>
</template>

<script>
</script>

<style>
	.myHead{
		height: 60px;
		line-height: 60px;
		display: flex;
		align-items: center;
		align-content: center;
	}
	.logo{
		
	}
	.logo a{
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>