<template>
  <div id="app">
    <el-header>
      <nav-header></nav-header>
    </el-header>
      <router-view></router-view>
  </div>
</template>

<script>
  import NavHeader from './components/NavHeader'
  export default {
    components: {
      NavHeader,
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  ul{
    list-style: none;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  .el-container {
    position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  
  .el-aside {
    overflow-x: hidden;
  }
</style>