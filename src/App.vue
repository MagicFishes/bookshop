<!--
 * @Author: your name
 * @Date: 2022-03-22 16:13:19
 * @LastEditTime: 2022-03-31 18:56:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\App.vue
-->
<template>
  <div id="app">
    <router-view></router-view>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    //不缓存的页面
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>

<style lang="scss">
    #app{
 
    }
</style>
