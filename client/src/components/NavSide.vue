<template>
  <el-menu
	  default-active="1-1"
	  class="el-menu-vertical-demo"
	  @open="handleOpen"
	  @close="handleClose">
	  <el-submenu index="1">
	    <template slot="title">
	      <i class="el-icon-location"></i>
	      <span>会员管理</span>
	    </template>
	      <!--<template slot="title">分组一</template>-->
	      <el-menu-item index="1-1">
	      	<router-link href="javascript:;" to="/memberList">会员列表</router-link>
	      </el-menu-item>
	      <el-menu-item index="1-2">
	      	<router-link href="javascript:;" to="/memberAdd">会员新增</router-link>
      	</el-menu-item>
	  </el-submenu>
	  <el-submenu index="2">
	  	<template slot="title">
	      <i class="el-icon-menu"></i>
		    <span slot="title">商品管理</span>
	    </template>
		  <el-menu-item index="2-1">
      	<router-link href="javascript:;" to="/memberList">商品列表</router-link>
      </el-menu-item>
      <el-menu-item index="2-2">
      	<router-link href="javascript:;" to="/memberList">商品新增</router-link>
      </el-menu-item>
      <el-menu-item index="2-3">
      	<router-link href="javascript:;" to="/memberList">商品分类</router-link>
      </el-menu-item>
	  </el-submenu>
	  <el-menu-item index="3">
	    <i class="el-icon-document"></i>
	    <span slot="title">库存管理</span>
	  </el-menu-item>
	  <el-submenu index="4">
	  	<template slot="title">
	      <i class="el-icon-setting"></i>
	    	<span slot="title">店铺统计</span>
	    </template>
    	<el-menu-item index="2-1">
      	<router-link href="javascript:;" to="/memberList">销售统计</router-link>
      </el-menu-item>
  	</el-submenu>
	</el-menu>
</template>

<script>
	export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
