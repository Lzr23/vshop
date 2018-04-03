<template>
	<el-row class='myHead'>
		<el-col :span='6' class='logo'>
			<router-link href="javascript:;" to="/home">
			  <img class="navbar-brand-logo" src="/static/logo.png">
			</router-link>
		</el-col>
		<router-link href="javascript:;" to="/backEnd">后台管理</router-link>
		<router-link href="javascript:;" to="/checkstand">前台收银</router-link>
		<!--<a href="javascript:;">退出</a>-->
		<router-link href="javascript:;" to="/">退出</router-link>
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