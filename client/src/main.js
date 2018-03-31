// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/myCss.css'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip')

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3
})

Vue.use(VueAxios, Axios)
Vue.use(ElementUI)


Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
