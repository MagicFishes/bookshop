<!--
 * @Author: your name
 * @Date: 2022-03-22 17:42:22
 * @LastEditTime: 2022-04-08 19:38:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\bookshop\search.vue
-->
<template>
  <div class="box">
    <!-- <head></head> -->
    <van-nav-bar
      :title="title"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
    />
    <!-- <back title="搜索"></back> -->
    <div class="list">
      <div v-show="open">
        <van-empty image="search" description="未查询到内容" />
      </div>
      <div
        v-for="(item, index) in proDetailData"
        :key="index"
        @click="desc(item.id)"
      >
        <bookDescCow
          :title="item.text"
          :src="item.cover"
          :desc="item.d"
          :author="item.author"
        ></bookDescCow>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",

  created() {
    //获取路由参数
    // console.log("this.$route ==> ", this.$route);
    let params = this.$route.params.id;
    // console.log("params ==> ", params);
    // console.log(this.getProDetailByPid(params));
    this.getProDetailByPid(params);
  },
  data() {
    return {
      proDetailData: [],
      recordArr: [],
      title: "搜索",
      open: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //发送record，制作浏览记录页面
    //发送id，制作详情页
    desc(id) {
      if (localStorage.getItem("record")) {
        this.recordArr = JSON.parse(localStorage.getItem("record"));
      } else {
        this.recordArr = [];
      }
      this.recordArr.push(id);
      this.recordArr = [...new Set(this.recordArr)];
      localStorage.setItem("record", JSON.stringify(this.recordArr));
      this.$router.push({ name: "BookDesc", params: { id: id } });
    },

    //根据商品的pid商品详情信息
    getProDetailByPid(pid) {
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/yunyuedu/search/searchHint?search=" + pid,
        params: {},
      })
        .then((result) => {
          // console.log("result ==> ", result);
          // this.proDetailData = result.data.words.w;
          if(Array.isArray(result.data.words.w)){
          this.proDetailData = result.data.words.w;

          }else {
            this.proDetailData = result.data.words;
          }
          // console.log('this.proDetailData',this.proDetailData);
          if (!this.proDetailData) {
            this.open = true;
          }
        })
        .catch((err) => {
          // console.log("err ==> ", err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar-track-piece {
  //滚动条凹槽的颜色，还可以设置边框属性
  background-color: #f8f8f8;
}
::-webkit-scrollbar {
  //滚动条的宽度
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  //滚动条的设置
  background-color: #dddddd;
  background-clip: padding-box;
  min-height: 28px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #bbb;
}

.text {
  width: 100%;
  height: 500px;
  background: rgb(233, 233, 233);
}
.box {
  width: 100%;
  // height: calc(100% - 50px);
  // margin-bottom: 50px;
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
  .list {
    width: 95%;
    margin: 0 auto;
    margin-top: 50px;
    div {
      margin-top: 5px;
    }
  }
}
</style>