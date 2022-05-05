<!--
 * @Author: your name
 * @Date: 2022-03-22 16:53:04
 * @LastEditTime: 2022-04-08 22:34:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\stacks.vue
-->
<template>
  <div class="box">
    <van-nav-bar
      :title="title"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="type" v-if="type_arr">
      <div class="move" ref="move"></div>
      <div
        class="small_box"
        :class="active == index ? 'active' : ''"
        v-for="(item, index) in type_arr"
        :key="index"
        @click="change_active(index), type_button(item.id, item.type_id)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- <div class="open">
      <van-tabs
        v-model="active"
        :title="item.name"
        v-for="(item, index) in type_arr"
        :key="index"
        @click="type_button(item.id, item.type_id)"
      >
        <van-tab>{{item.name}} </van-tab>
      </van-tabs>
    </div> -->

    <div class="type_content" v-if="type_arr">
      <!-- <router-view></router-view> -->

      <button
        @click="type(item.id, item.name)"
        v-for="(item, index) in button_arr"
        :key="index"
      >
        {{ item.name }}
      </button>
    </div>
    <!-- //开局选项 -->
  </div>
</template>

<script>
export default {
  name: "Stacks",
  created() {
    // console.log("sss");
    this.type_people();
  },
  data() {
    return {
      button_arr: [],
      type_arr: [],
      title: "书库",
      active: 0,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    type_button(id, type_id) {
      // console.log("sss");
      this.axios({
        method: "get",
        url:
          "https://apis.netstart.cn/yunyuedu/store/info.json?type=" +
          id +
          "&bar=cat&uuid=" +
          type_id +
          "",
        params: {},
      })
        .then((result) => {
          this.button_arr = [];
          // console.log(result);
          let result_arr = result.data.list[0].labels;
          for (let i = 0; i < result_arr.length; i++) {
            this.button_arr.push({
              name: result_arr[i].name,

              id: result_arr[i].url.split("?")[1].split("=")[1],
            });
          }
          // console.log(this.button_arr);
          // type_arr
        })
        .catch((err) => {
          // console.log("err ==> ", err);
        });
    },
    type_people() {
      this.axios({
        method: "get",
        url: "https://apis.netstart.cn/yunyuedu/store/node.json?gender=1",
        params: {},
      })
        .then((result) => {
          //   console.log(result);
          let result_arr = result.data.books;
          // console.log(result_arr);
          for (let i = 0; i < result_arr.length; i++) {
            this.type_arr.push({
              id: result_arr[i].id,
              name: result_arr[i].name,
              type_id: result_arr[i].node[0].id,
              // name:result_arr[i].name,
            });
          }
          // console.log(this.type_arr);
        })
        .then((result) => {
          this.type_button(this.type_arr[0].id, this.type_arr[0].type_id);
        })

        .catch((err) => {
          // console.log("err ==> ", err);
        });
    },
    type(id, id_name) {
      this.$router.push({
        name: "StacksType",
        params: { id: id, idName: id_name },
      });
    },
    change_active(index) {
      this.active = index;
      
      // console.log(this.$refs.move);
      this.$refs.move.style.left=index*60+20*index+"px"
    },
    change(id, type_id) {
      this.$router.push({
        name: "StacksType",
        params: {
          id: id,
          type_id: type_id,
        },
      });
    },
  },
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
// .open {
//   display: flex;
//   width: 100%;
//   justify-content: space-evenly;
//   .van-tabs,
//   .van-tabs--line {
//     width: 25%;
//   }
// }
  ::-webkit-scrollbar{
    width: 0px;
    height: 7px;
    background-color: #F5F5F5;
  }

.box {
  width: 375px;
  height: calc(100% - 50px);
    // margin-bottom: 50px;
overflow-y: auto;
  // background: rgb(204, 237, 253);
  position: fixed;
  top: 0px;
  left: 0px;
  // background: #999;
  margin-bottom: 20px;
  .type {
    .move{
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
    // height: 100%;
    height: 572px;
    padding: 10px;
    box-sizing: border-box;
    // overflow-y: auto;
    // margin-bottom: 50px;
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