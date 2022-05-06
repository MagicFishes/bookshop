<!--
 * @Author: your name
 * @Date: 2022-03-30 14:49:24
 * @LastEditTime: 2022-04-08 19:42:04
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \twice_html\bookshop\src\views\Original.vue
-->
<template>
  <div class="abox">
    <van-nav-bar
      :title="title"
      left-text=""
      right-text=""
      left-arrow
      :fixed='true'
      @click-left="onClickLeft"
    />
    <ul class="bigBox">
      <li class="box">
        <div class="span">受众：</div>

        <van-radio-group v-model="gender" direction="horizontal">
          <van-radio name="male">男</van-radio>
          <van-radio name="female">女</van-radio>
        </van-radio-group>
      </li>
      <li class="box">
        <div class="span">排行日期：</div>
        <van-radio-group v-model="dataTime" direction="horizontal">
          <van-radio name="day">日</van-radio>
          <van-radio name="week">周</van-radio>
          <van-radio name="month">月</van-radio>
        </van-radio-group>
      </li>
      <button @click="change(gender,dataTime)">筛选</button>
    </ul>
    <!-- //开局选项 -->
    <div class="list">
        <div v-for="(item,index) in type_arr" :key="index" @click="turn(item.title)">
            <bookDescCow :title="item.title" :author="item.author" :desc="item.description" :src="item.iconUrl"></bookDescCow>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    name:"Original",
  created() {
    this.$nextTick(function () {
      this.change(this.gender,this.dataTime);
    });
  },
  data() {
    return {
      gender: "male",
      dataTime: "day",
    //   id_type: 0,
    //   sort_type: 0,
    //   active: 0,
    //   button_arr: [],
      type_arr: [],
      title: "原创小说",
    };
  },
  methods: {
      turn(id){
          this.$router.push({name:"Search",params:{
              id:id
          }})
      },
    onClickLeft() {
      this.$router.go(-1);
    },
    change_active(index) {
      this.active = index;
    },
    change(id,dataTime) {
      this.axios({
        url: "https://apis.netstart.cn/yunyuedu/rank/original/list/data.json?gender="+id+"&sortType="+dataTime+"&type=sell",
        method: "get",
        params: {},
      })
        .then((result) => {
        //   console.log(result);
          this.type_arr=result.data.data.books
          // console.log(this.type_arr);

        })
        .catch((err) => {
          // console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .van-nav-bar ,.van-hairline--bottom{
    //  background: linear-gradient(180deg, #fe3c53da, #ff7a8977);
    background: #eb4659;
z-index: 100;
  }
  ::v-deep .van-nav-bar__title, .van-ellipsis{
    color: white;
    font-size: 16px;
  }
  ::v-deep.van-nav-bar__text{
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.356);
    padding:5px;
    border-radius: 10px;
  }

 ::v-deep .van-icon ,.van-icon-arrow-left ,.van-nav-bar__arrow{
    color: white;
  }
.abox {
  width: 375px;
  height: 617px;

  //   position: fixed;
  top: 0px;
  left: 0px;
  .bigBox {
    width: 100%;
    height: auto;
    margin-top: 50px;
    .box {
      display: flex;
      width: 100%;
      height: 25px;
      line-height: 25px;
      margin-top: 5px;
      .span {
        // display: block;
        width: 25%;
        text-align: center;
        font-size: 12px;
      }
    }
    button {
      width: 50%;
      height: 30px;
      margin: 0 auto;
      display: block;
      margin-top: 10px;
      border-radius: 20px;
      border: 0px;
      border: 1px solid rgba(153, 153, 153, 0.486);
       background: linear-gradient(120deg, #ff7a8983, #fe3c539d);
    }
  }
  .list{
      padding: 5px;
  }
}
</style>