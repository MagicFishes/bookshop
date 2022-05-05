/*
 * @Author: your name
 * @Date: 2022-03-22 16:13:19
 * @LastEditTime: 2022-04-05 21:51:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'


import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

import head from "./components/head.vue"
Vue.component("myHead", head)

import bookDescRow from "./components/book_desc_row.vue"
Vue.component("bookDescRow", bookDescRow)

import bookDescCow from "./components/book_desc_cow.vue"
Vue.component("bookDescCow", bookDescCow)
import back from "./components/back.vue"
Vue.component("back", back)

import {
  tokenUrl
} from './valid/tokenUrl'

import {
  Tabbar,
  TabbarItem,
  Search,
  Toast,
  Card,
  Swipe,
  SwipeItem,
  NoticeBar,
  Overlay,
  NavBar,
  Collapse,
  CollapseItem,
  Popup,
  cell,
  Button,
  Slider,
  Form,
  Field,
  Loading,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Icon,
  Uploader,
  RadioGroup,
  Radio,
  Switch,
  Dialog,
  Tab,
  Tabs,
  Empty ,
  

} from 'vant';

Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Toast)
  .use(Card)
  .use(Swipe)
  .use(SwipeItem)
  .use(NoticeBar)
  .use(Overlay)
  .use(NavBar)
  .use(Collapse)
  .use(CollapseItem)
  .use(Popup)
  .use(cell)
  .use(Button)
  .use(Slider)
  .use(Form)
  .use(Field)
  .use(Loading)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Icon)
  .use(Uploader)
  .use(RadioGroup)
  .use(Radio)
  .use(Switch)
  .use(Dialog)
  .use(Tab)
  .use(Tabs)
  .use(Empty )


axios.interceptors.request.use(config => {
  //config:请求配置（请求头，请求参数）,请求类型，请求路径
  // console.log("发起请求之前执行");

  //启动加载提示
  Toast.loading({
    message: "加载中...",
    //禁止点击穿透
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0

  })
  return config;
}, err => {
  // console.log("err=>",err);
  Toast.clear();
  return Promise.reject(err)
})

axios.interceptors.response.use(config => {
  Toast.clear();
  return config;
}, err => {
  // console.log("err=>",err);
  return Promise.reject(err)
})


//全局守卫,确认登录状态
//全局前置守卫
router.beforeEach((to, from, next) => {
  if(to.name==="Login"){
 
    next();
  }else{
    if (to.name === "BookShelf" || to.name === "My") {
      if (localStorage.getItem("token")) {
        next();
      } else {
       router.push('/login')
  
      }
    } else {
      next();
    }
  }
  //to: 目标路由
  //from: 开始路由
  //next: 函数, 控制是否允许访问目标路由
  // console.log('01-beforeEach');
  // console.log('01-beforeEach to ==> ', to);
  // console.log('01-beforeEach from ==> ', from);
  // console.log('next ==> ', next);

  //允许访问目标路由
  // next();

  //不允许访问目标路由
  // next(false);
  // if(to.name=="Login"||to.name==""){
  //   next()
  // }else{
  //   for(let i =0;i<tokenUrl.length;i++){
  //     if(to.name.indexOf(tokenUrl[i]>-1)){
  //       if(localStorage.getItem("token")){
  //         next();
  //       }else{
  //         next({name:"Login"})
  //       }
  //     }else{
  //       next();
  //     }
  //   }
  // }

  
  // if(to.name){
  // console.log("name", to.name);
  // for
  // console.log(tokenUrl);

  // }
  // console.log("我是守卫");
  //如果是订单页面, 则需要验证登录
  // if (to.name === 'order') {
  //   //访问我的订单页面时, 判断是否登录
  //   // console.log('访问订单页面');
  //   if (to.meta.isLogin === true) {
  //     //登录, 允许访问我的订单页面
  //     // console.log('已经登录');
  //     next();
  // console.log(to.meta);
  // console.log(localStorage.getItem("id"));

  //   } else {
  //     //如果没有登录, 跳转到登录页面
  //     // console.log('未登录');
  //     next({name: 'login'});
  //   }
  // } else {
  //   //如果不是订单页面直接通过
  //   // console.log('其他页面');
  // next();
  // }


})




// //解决/跳转到其他页面的报错
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')