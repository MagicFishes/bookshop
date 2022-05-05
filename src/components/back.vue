<!--
 * @Author: your name
 * @Date: 2022-03-23 20:15:36
 * @LastEditTime: 2022-04-08 21:42:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\components\back.vue
-->
<template>
  <div class="back" :title="title">
      <div class="re">
           <div class="img" @click="back()">
      <img src="../assets/后退.png" alt="" />
    </div>
    <span class="text">{{ title }}</span>
      </div>
   
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
      // console.log("sss");
    },
  },
};
</script>

<style lang="scss" scoped>
.back {
  width: 100%;
  height: 50px;
  // background: rgb(241, 110, 143);
//   position: fixed;
//   top: 0px;
//   left: 0px;
//   margin-bottom: 50px;
  border-bottom: 1px solid #999;
  .re{
    position: relative;

  }
  .img {
    width: 100px;
    // float: left;
    position: absolute;
    left: 0px;
    top: 0px;
    margin-top: 10px;
    img {
      height: 30px;
    }
  }
  .text {
    //   float: right;
    font-size: 20px;
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    // text-align: left;
    display: block;

  }
}
</style>