<!--
 * @Author: your name
 * @Date: 2022-03-22 16:13:19
 * @LastEditTime: 2022-03-31 10:18:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\HomeView.vue
-->
<template>
  <div class="main">
    <div>
    <router-view></router-view>

    </div>
    <div class="list">
         <van-tabbar v-model="activeIndex"  active-color="#fe3c53" route>

      <van-tabbar-item v-for="(item, index) in tabbarData" :key="index" :to="{name: item.routeName}">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
      </van-tabbar-item>

    </van-tabbar>
    </div>
 
      </div>
</template>

<script>
export default {
 name: 'Main',
  data() {
    return {
      activeIndex: 0,
      tabbarData: [
        {
          title: '书架',
          routeName: 'BookShelf',
          activeIcon: require('../assets/bottom/书架active.png'),
          inactiveIcon: require('../assets/bottom/书架.png')
        },
        {
          title: '书城',
          routeName: 'Bookshop',
          activeIcon: require('../assets/bottom/书active.png'),
          inactiveIcon: require('../assets/bottom/书.png')
        },
        {
          title: '书库',
          routeName: 'Stacks',
          activeIcon: require('../assets/bottom/书桌active.png'),
          inactiveIcon: require('../assets/bottom/书桌.png')
        },
        {
          title: '我的',
          routeName: 'My',
          activeIcon: require('../assets/bottom/我的active.png'),
          inactiveIcon: require('../assets/bottom/我的.png')
        }
      ]
    };
  }

};
</script>
<style lang="scss" scoped>
  .list{
    position: fixed;
    bottom: 0px;
    left: 0px;
  }
</style>
