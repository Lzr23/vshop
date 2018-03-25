import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import memberList from '@/pages/memberList'
import memberAdd from '@/pages/memberAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/memberList',
      name: 'memberList',
      component: memberList
    },
    {
      path: '/memberAdd',
      name: 'memberAdd',
      component: memberAdd
    }
  ]
})
