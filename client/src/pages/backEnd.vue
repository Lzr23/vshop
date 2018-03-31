<template>
  <div id="backEnd">
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
  import NavSide from '../components/NavSide'
  export default {
    components: {
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