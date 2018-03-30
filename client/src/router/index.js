import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import memberList from '@/pages/memberList'
import memberAdd from '@/pages/memberAdd'
import memberGrade from '@/pages/memberGrade'
import goodsList from '@/pages/goodsList'
import goodsAdd from '@/pages/goodsAdd'
import goodsClassify from '@/pages/goodsClassify'

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
    },
    {
      path: '/memberGrade',
      name: 'memberGraderAdd',
      component: memberGrade
    },
    {
      path: '/goodsList',
      name: 'goodsList',
      component: goodsList
    },
    {
      path: '/goodsAdd',
      name: 'goodsAdd',
      component: goodsAdd
    },
    {
      path: '/goodsClassify',
      name: 'goodsClassify',
      component: goodsClassify
    }
  ]
})
