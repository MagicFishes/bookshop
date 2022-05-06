/*
 * @Author: your name
 * @Date: 2022-03-22 16:13:19
 * @LastEditTime: 2022-04-08 21:45:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Main',
    component: () => import( /* webpackChunkName: "about" */ '../views/Main.vue'),
    children: [{
        path: 'bookShelf',
        name: 'BookShelf',
        component: () => import("../views/Bookshelf.vue"),
      },
      {
        alias: "/",
        path: 'bookshop',
        name: 'Bookshop',
        component: () => import( /* webpackChunkName: "about" */ '../views/Bookshop.vue'),
        children: [
          
          
        ]
      },

      {
        path: 'my',
        name: 'My',
        component: () => import( /* webpackChunkName: "about" */ '../views/My.vue'),
      },
      {
        path: 'stacks',
        name: 'Stacks',
        component: () => import( /* webpackChunkName: "about" */ '../views/Stacks.vue'),
        children: [

        ]
      },

    ]
  },
  {
    path: '/search/:id',
    name: 'Search',
    component: () => import("../views/bookshop/search.vue"),
    meta: {
      keepAlive: false, //此组件不需要被缓存
      isBack: false, //用于判断上一个页面是哪个
    }
  },
  {
    path: '/bookDesc/:id',
    name: 'BookDesc',
    component: () => import("../views/bookshop/bookDesc.vue"),
  },
  {
    path: '/bookList/:id',
    name: 'BookList',
    component: () => import("../views/bookshop/bookList.vue"),
  },
  {
    path: '/bookContent/:id/:index',
    name: 'BookContent',
    component: () => import("../views/bookshop/bookContent.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue"),
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import("../views/Record.vue"),
  },
  {
    path: '/stacksType/:id/:idName',
    name: 'StacksType',
    component: () => import("../views/bookshop/StacksType.vue"),
  },
  {
    path: '/hotBar',
    name: 'HotBar',
    component: () => import('../views/HotBar.vue'),
  },
  {
    path: '/hotBarList/:rankType/:uuid',
    name: 'HotBarList',
    component: () => import('../views/HotBar_list.vue'),
  },
  {
    path: '/original',
    name: 'Original',
    component: () => import('../views/Original.vue'),
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/Publish.vue'),
  },
  {
    path: '/moneyHistory',
    name: 'MoneyHistory',
    component: () => import('../views/moneyHistory.vue'),
  },
  {
    path: '/myPrize',
    name: 'MyPrize',
    component: () => import('../views/myPrize.vue'),
  },
  {
    path: '/saleHistory',
    name: 'SaleHistory',
    component: () => import('../views/saleHistory.vue'),
  },

]

const router = new VueRouter({
  mode:'hash',
  routes
})

export default router