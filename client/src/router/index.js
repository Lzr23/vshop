import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import home from '@/pages/home'
import backEnd from '@/pages/backEnd'
import checkstand from '@/pages/checkstand'

import memberList from '@/pages/memberList'
import memberAdd from '@/pages/memberAdd'
import memberGrade from '@/pages/memberGrade'

import goodsList from '@/pages/goodsList'
import goodsAdd from '@/pages/goodsAdd'
import goodsClassify from '@/pages/goodsClassify'

import stockGoods from '@/pages/stockGoods'
import stockWarehouse from '@/pages/stockWarehouse'

import statisticsMember from '@/pages/statisticsMember'
import statisticsGoods from '@/pages/statisticsGoods'
import statisticsSale from '@/pages/statisticsSale'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/checkstand',
      name: 'checkstand',
      component: checkstand
    },
    {
      path: '/backEnd',
      component: backEnd,
      children: [
        {
          path: '',
          component: memberList
        },
        {
          path: 'memberList',
          name: 'memberList',
          component: memberList
        },
        {
          path: 'memberAdd',
          name: 'memberAdd',
          component: memberAdd
        },
        {
          path: 'memberGrade',
          name: 'memberGrader',
          component: memberGrade
        },
        {
          path: 'goodsList',
          name: 'goodsList',
          component: goodsList
        },
        {
          path: 'goodsAdd',
          name: 'goodsAdd',
          component: goodsAdd
        },
        {
          path: 'goodsClassify',
          name: 'goodsClassify',
          component: goodsClassify
        },
        {
          path: 'stockGoods',
          name: 'stockGoods',
          component: stockGoods
        },
        {
          path: 'stockWarehouse',
          name: 'stockWarehouse',
          component: stockWarehouse
        },
        {
          path: 'statisticsMember',
          name: 'statisticsMember',
          component: statisticsMember
        },
        {
          path: 'statisticsGoods',
          name: 'statisticsGoods',
          component: statisticsGoods
        },
        {
          path: 'statisticsSale',
          name: 'statisticsSale',
          component: statisticsSale
        }
      ]
    }
  ]
})
