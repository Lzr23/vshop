<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
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
    color: #2c3e50;
/*    text-align: center;*/
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