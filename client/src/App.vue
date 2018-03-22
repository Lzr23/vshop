<template>
  <div id="app">
	<el-header>
			<nav-header></nav-header>
		</el-header>
  	<el-container>
			<el-aside width='200px'>
				<nav-side></nav-side>
			</el-aside>
  		<el-main>
  			<router-view></router-view>
  		</el-main>
  	</el-container>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader'
import NavSide from './components/NavSide'
export default {
  components: {
    NavHeader,
    NavSide
  }
}

</script>

<style>
*{
	margin: 0;
	padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-container{
	  position: absolute;
    top: 60px;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>
