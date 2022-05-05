<!--
 * @Author: your name
 * @Date: 2022-04-05 16:25:50
 * @LastEditTime: 2022-04-05 16:59:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\saleHistory.vue
-->
<template>
  <div>
    <van-nav-bar
      title="消费记录"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />
    <div class="box">
      <van-empty image="error" description="暂无信息" />
    </div>
  </div>
</template>

<script>
export default {
  name: "'SaleHistory",
  methods:{
      onClickLeft(){
          this.$router.go(-1)
      }
  }
};
</script>

<style lang="scss" scoped>
.van-nav-bar,
.van-hairline--bottom {
  //  background: linear-gradient(180deg, #fe3c53da, #ff7a8977);
  background: #eb4659;
z-index: 100;
}
::v-deep .van-nav-bar__title,
.van-ellipsis {
  color: white;
  font-size: 16px;
}
::v-deep.van-nav-bar__text {
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.356);
  padding: 5px;
  border-radius: 10px;
}

::v-deep .van-icon,
.van-icon-arrow-left,
.van-nav-bar__arrow {
  color: white;
}
.box{
    margin-top: 50px;
    // background: #999;
}
</style>