<template>
  <div id="backEnd">
  	<el-header>
      <nav-header></nav-header>
    </el-header>
    <el-container>
      <el-aside width='170px'>
        <nav-side></nav-side>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
	import NavHeader from '../components/NavHeader'
  import NavSide from '../components/NavSide'
  export default {
    components: {
    	NavHeader,
      NavSide
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .el-aside {
    overflow-x: hidden;
  }
</style>