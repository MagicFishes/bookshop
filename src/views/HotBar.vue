<!--
 * @Author: your name
 * @Date: 2022-03-30 09:15:08
 * @LastEditTime: 2022-04-08 19:40:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\bookshop\hot_bar.vue
-->
<template>
  <div class="box">
    <van-nav-bar
      title="排行榜"
      left-text=""
      right-text=""
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      :placeholder="true"
    />

    <!-- <div class="box">
      <div class="type">
        <div
          class="small_box"
          :class="active == index ? 'active' : ''"
          v-for="(item, index) in type_arr"
          :key="index"
          @click="change_active(index)"
        >
          {{ item.name }}
        </div>
      </div> -->

    <div class="type" v-if="type_arr">
      <div class="move" ref="move"></div>
      <div
        class="small_box"
        :class="active == index ? 'active' : ''"
        v-for="(item, index) in type_arr"
        :key="index"
        @click="change_active(index)"
      >
        {{ item.name }}
      </div>
    </div>

    <!-- <div class="type_content">

       

        <button
          @click="type(index)"
          v-for="(item, index) in button_arr"
          :key="index"
        >
          {{ item.name }}
        </button>
      </div> -->
    <!-- //开局选项 -->
    <div class="type_content" v-if="type_arr">
      <!-- <router-view></router-view> -->

      <button
        @click="type(index)"
        v-for="(item, index) in button_arr"
        :key="index"
      >
        {{ item.name }}
      </button>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HotBar",
  created() {
    this.enter_first();
  },
  data() {
    return {
      active: 0,
      button_arr: [],
      type_arr: [],
      title: null,
    };
  },
  methods: {
    type(index) {
      let a = this.button_arr[index].naviInfos[0].url.split("?")[1].split("&");
      let b = {};
      for (let i = 0; i < a.length; i++) {
        b[a[i].split("=")[0]] = a[i].split("=")[1];
      }

      // console.log(b);
      this.title = this.button_arr[index].naviInfos[0].name;
      this.$router.push({
        name: "HotBarList",
        params: {
          rankType: b.rankType,
          uuid: b.uuid,
          title: this.title,
        },
      });
    },
    onClickLeft() {
      //   Toast("返回");
      this.$router.go(-1);
    },
    change_active(index) {
      this.active = index;
      this.button_arr = this.type_arr[index].subNavis;
      this.active = index;

      // console.log(this.$refs.move);
      this.$refs.move.style.left = index * 60 + 20 * index + "px";
      //   console.log(this.button_arr);
    },
    enter_first() {
      this.axios({
        method: "get",

        url: "https://apis.netstart.cn/yunyuedu/store/merged/rankNavi.json",
        params: {},
      })
        .then((result) => {
          // console.log(result);
          let a = result.data.data.list;
          this.type_arr = a;
          // console.log(this.type_arr);
          this.button_arr = a[0].subNavis;
          // console.log(this.button_arr);
        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar,
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
.box {
  width: 375px;
  height: calc(100% - 50px);

  // background: rgb(204, 237, 253);
  position: fixed;
  top: 0px;
  left: 0px;
  // background: #999;
  margin-bottom: 20px;
  .type {
    .move {
      position: absolute;
      width: 20%;
      height: 2px;
      background: #eb4659f6;
      left: 0px;
      bottom: 0px;
      transition: left 0.3s linear;
    }
    // width: 30%;
    // background: #eb4659f6;
    // background: #d3d3d362;
    font-family: "黑体";
    // height: 100%;
    // background: linear-gradient(180deg, #ff7a8996, #fe3c533f);
    // filter:blur(10px);
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // line-height: 617px;
    // text-align: center;
    // float: left;
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    position: relative;
    .small_box {
      &.active {
        // background: white;
        // background:#ff7a89;
        // background: #fffffff6;
      }
      width: 20%;
      height: 50px;
      // border: 1px solid #999;
      // border-radius: 15px;
      // background: rgba(99, 99, 99, 0.123);

      //   margin-bottom: 5px;
      text-align: center;
      line-height: 50px;
      font-size: 16px;
      //   border: 1px solid #999;
      box-sizing: border-box;
    }
  }
  .type_content {
    background: rgb(255, 255, 255);
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    // float: right;
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    // padding: 1px;
    // align-items: flex-start;
    button {
      display: block;
      width: 100%;
      height: 30px;
      // float: left;
      // padding: 0px 5px;
      // background: rgba(255, 149, 149, 0.205);
      // margin: 0px 15px;
      font-size: 16px;
      margin-top: 10px;
      // border: 1px solid #999;
      border: 0px;
      font-family: "黑体";
      color: rgb(26, 26, 26);
      box-shadow: 0px 0px 1px 1px #b8b1b2;
      border-radius: 15px;
      // background: #ff7a89;
      background: none;
      //  background:#d3d3d362;
      //  background: linear-gradient(180deg, #ff7a8983, #fe3c539d);
    }
  }
}
</style>